import { useVideoCarousel } from '@/hooks/useVideoCarousel'
import { heroVideo1, heroVideo2 } from '@/assets/videos'
import { useEffect, useRef } from 'react'
import { useVideoContext } from '@/contexts/VideoContext'

interface VideoCarouselProps {
  className?: string
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({ className = '' }) => {
  const videos = [heroVideo1, heroVideo2].filter(
    (video): video is string => video !== undefined
  )
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const prevIndexRef = useRef<number>(0)

  const { currentIndex, isTransitioning, goToIndex } = useVideoCarousel({
    totalVideos: videos.length || 1,
    // autoPlayInterval: 7000, // 7 seconds before starting transition
    fadeDuration: 1500, // 1.5 seconds smooth fade
  })

  const { setCurrentVideoIndex } = useVideoContext()

  // Update context immediately when video index changes (sync with transition)
  // This ensures navbar colors change at the same time as video transition
  useEffect(() => {
    setCurrentVideoIndex(currentIndex)
  }, [currentIndex, setCurrentVideoIndex])

  // Track previous index correctly - update on currentIndex change when not transitioning
  useEffect(() => {
    if (!isTransitioning) {
      prevIndexRef.current = currentIndex
    }
  }, [currentIndex, isTransitioning])

  // Preload only the next video for better performance
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % videos.length
    const nextVideo = videoRefs.current[nextIndex]
    if (nextVideo) {
      nextVideo.preload = 'auto'
    }
  }, [currentIndex, videos.length])

  // Sync video playback during crossfade - prepare both videos for transition
  useEffect(() => {
    if (isTransitioning) {
      const nextIndex = currentIndex
      const prevIndex = prevIndexRef.current
      const nextVideo = videoRefs.current[nextIndex]
      const prevVideo = videoRefs.current[prevIndex]

      // Prepare next video - start from beginning for fresh start
      if (nextVideo && nextVideo.paused) {
        nextVideo.currentTime = 0
        nextVideo.play().catch(() => {})
      }
      
      // Keep previous video playing during fade out
      if (prevVideo && prevVideo.paused) {
        prevVideo.play().catch(() => {})
      }
    }
  }, [isTransitioning, currentIndex])

  // Manage video playback states for smooth transitions
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return

      const shouldPlay = 
        (index === currentIndex && !isTransitioning) ||
        (isTransitioning && (index === currentIndex || index === prevIndexRef.current))

      if (shouldPlay) {
        // Only call play if video is paused to avoid restarting
        if (video.paused) {
          video.play().catch(() => {})
        }
      } else {
        // Only pause if video is playing
        if (!video.paused) {
          video.pause()
        }
      }
    })
  }, [currentIndex, isTransitioning])

  // Show placeholder if no videos are available
  if (videos.length === 0) {
    return (
      <div className={`relative h-full w-full overflow-hidden bg-gray-900 ${className}`}>
        <div className="flex h-full items-center justify-center">
          <p className="text-white/50">Add hero videos to see video carousel</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      {/* Video Container */}
      <div className="relative h-full w-full">
        {videos.map((video, index) => (
          <video
            key={index}
            ref={(el) => {
              videoRefs.current[index] = el
            }}
            src={video}
            loop
            muted
            playsInline
            preload="auto"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
              index === currentIndex
                ? 'opacity-100 z-10' // Current video: always visible (fades in from 0 if was hidden)
                : index === prevIndexRef.current && isTransitioning
                ? 'opacity-0 z-5' // Previous video during transition: fades out (100 → 0)
                : 'opacity-0 z-0' // All other videos: hidden
            }`}
          />
        ))}
      </div>

      {/* Overlay - Background Image with 61% opacity */}
      <div className="absolute inset-0 z-20 bg-black/39"></div>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-3">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
              index === currentIndex
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to video ${index + 1}`}
            aria-current={index === currentIndex}
          />
        ))}
      </div>
    </div>
  )
}

export default VideoCarousel

