'use client'

import React, { createContext, useContext, useState } from 'react'

export interface PlayerContextType {
  isPlaying: boolean
  audioUrl: string
  playAudio: () => void
  playTrack: (url: string) => void
  pauseAudio: () => void
}
// Define the context
const PlayerContext = createContext<PlayerContextType | undefined>(undefined)

export const usePlayer = (): PlayerContextType => {
  const context = useContext(PlayerContext)
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}

// Define the provider component
export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioUrl, setAudioUrl] = useState('')

  const playTrack = (url: string) => {
    setAudioUrl(url)
    playAudio()
  }

  const playAudio = () => {
    setIsPlaying(true)
  }

  const pauseAudio = () => {
    setIsPlaying(false)
  }

  const value = {
    isPlaying,
    playTrack,
    playAudio,
    pauseAudio,
    audioUrl,
  }

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}
