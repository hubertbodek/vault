'use client'

import { DataTable } from '@/components/common/data-table'
import { Media } from '@/db/schemas/media'
import { usePlayer } from '@/providers/player'
import { ColumnDef } from '@tanstack/react-table'
import { Play, Pause } from 'lucide-react'

export const TracksList = ({ items }: { items: Media[] }) => {
  const { playTrack, pauseAudio, audioUrl: currentlyPlaying } = usePlayer()

  const columns: ColumnDef<Media>[] = [
    {
      accessorKey: 'control',
      header: () => (
        <div className="sm:table-cell">
          <span className="sr-only">Control</span>
        </div>
      ),
      cell: ({ row }) => (
        <div className="group/control flex size-8 items-center justify-center rounded bg-neutral-200 text-neutral-500">
          <div className="transition-transform group-hover/control:scale-110">
            {currentlyPlaying === row.original.url ? (
              <Pause className="size-4" onClick={() => playTrack('')} />
            ) : (
              <Play className="size-4" onClick={() => playTrack(row.original.url)} />
            )}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => row.original.name,
    },
    {
      accessorKey: 'artist',
      header: 'Artist',
      cell: ({ row }) => 'Arist',
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => row.original.type,
    },
    {
      accessorKey: 'createdAt',
      header: 'Uploaded on',
      cell: ({ row }) => {
        return row.original.createdAt
      },
    },
  ]

  return <DataTable columns={columns} data={items} />
}
