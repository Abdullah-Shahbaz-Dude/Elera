import { createContext, useContext, useState, ReactNode } from 'react'

interface VideoContextType {
  currentVideoIndex: number
  setCurrentVideoIndex: (index: number) => void
}

const VideoContext = createContext<VideoContextType | undefined>(undefined)

export const VideoProvider = ({ children }: { children: ReactNode }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  return (
    <VideoContext.Provider value={{ currentVideoIndex, setCurrentVideoIndex }}>
      {children}
    </VideoContext.Provider>
  )
}

export const useVideoContext = () => {
  const context = useContext(VideoContext)
  if (context === undefined) {
    throw new Error('useVideoContext must be used within a VideoProvider')
  }
  return context
}

