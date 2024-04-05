'use client'

import { DataTable } from '@/components/common/data-table'
import { Media } from '@/db/schemas/media'
import { cn } from '@/lib/utils'
import { usePlayer } from '@/providers/player'
import { ColumnDef } from '@tanstack/react-table'
import { Play, Pause } from 'lucide-react'

export const TracksList = ({ items }: { items: Media[] }) => {
  const { playTrack, audioUrl: currentlyPlaying } = usePlayer()

  const togglePlay = (url: string) => {
    currentlyPlaying === url ? playTrack('') : playTrack(url)
  }

  const columns: ColumnDef<Media>[] = [
    {
      accessorKey: 'control',
      header: () => (
        <div className="sm:table-cell">
          <span className="sr-only">Control</span>
        </div>
      ),
      cell: ({ row }) => {
        const isTrackPlaying = currentlyPlaying === row.original.url
        const getContrastedTextColor = (color: string) => {
          if (color.includes('800')) return 'text-neutral-200'
          if (color.includes('400')) return 'text-neutral-700'

          return 'text-neutral-500'
        }

        return (
          <div
            className={cn(
              'group/control flex size-8 items-center justify-center rounded',
              row.original.tailwindColor ?? 'bg-neutral-100',
              getContrastedTextColor(row.original.tailwindColor ?? 'bg-neutral-100')
            )}
            onClick={() => togglePlay(row.original.url)}
          >
            <div className="transition-transform group-hover/control:scale-110">
              {isTrackPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
            </div>
          </div>
        )
      },
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
