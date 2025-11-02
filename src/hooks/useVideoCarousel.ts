import { useState, useEffect, useCallback } from 'react'

interface UseVideoCarouselOptions {
  totalVideos: number
  autoPlayInterval?: number // in milliseconds
  fadeDuration?: number // in milliseconds
}

interface UseVideoCarouselReturn {
  currentIndex: number
  isTransitioning: boolean
  goToIndex: (index: number) => void
  next: () => void
  previous: () => void
}

export const useVideoCarousel = ({
  totalVideos,
  autoPlayInterval = 6000,
  fadeDuration = 1000,
}: UseVideoCarouselOptions): UseVideoCarouselReturn => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goToIndex = useCallback(
    (index: number) => {
      if (index < 0 || index >= totalVideos || index === currentIndex) {
        return
      }

      // Start smooth transition
      setIsTransitioning(true)
      
      // Switch index immediately (opacity transitions handle the crossfade)
      // This allows both videos to be visible during the transition
      setCurrentIndex(index)
      
      // Complete transition after full fade duration matches CSS transition
      setTimeout(() => {
        setIsTransitioning(false)
      }, fadeDuration)
    },
    [currentIndex, totalVideos, fadeDuration]
  )

  const next = useCallback(() => {
    const nextIndex = (currentIndex + 1) % totalVideos
    goToIndex(nextIndex)
  }, [currentIndex, totalVideos, goToIndex])

  const previous = useCallback(() => {
    const prevIndex = (currentIndex - 1 + totalVideos) % totalVideos
    goToIndex(prevIndex)
  }, [currentIndex, totalVideos, goToIndex])

  useEffect(() => {
    if (totalVideos <= 1) return

    const interval = setInterval(() => {
      next()
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [currentIndex, autoPlayInterval, next, totalVideos])

  return {
    currentIndex,
    isTransitioning,
    goToIndex,
    next,
    previous,
  }
}

