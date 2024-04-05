'use client'

import { usePlayer } from '@/providers/player'
import React from 'react'

export const PlayerController = () => {
  const { audioUrl, isPlaying } = usePlayer()

  return (
    <div className="fixed bottom-0 left-0 flex h-20 w-full items-center justify-center border-t border-border/40 bg-background">
      <audio controls autoPlay={isPlaying} key={audioUrl}>
        <source src={audioUrl} type="audio/mpeg" />
      </audio>
    </div>
  )
}
