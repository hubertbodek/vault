'use client'

import { deleteMedia } from '@/actions/media/delete-media'
import { DataTable } from '@/components/common/data-table'
import { TableActions } from '@/components/common/table-actions'
import { Media } from '@/db/schemas/media'
import { useServerAction } from '@/hooks/use-server-action'
import { cn } from '@/lib/utils'
import { usePlayer } from '@/providers/player'
import { ColumnDef } from '@tanstack/react-table'
import { Play, Pause } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface TracksListProps {
  items: Media[] | null
}

export const TracksList = ({ items }: TracksListProps) => {
  const router = useRouter()
  const { playTrack, audioUrl: currentlyPlaying } = usePlayer()
  const [deleteMediaAction, isLoading] = useServerAction(deleteMedia, () => router.refresh())

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
    {
      accessorKey: 'delete',
      header: () => <span className="sr-only">Actions</span>,
      cell: ({ row }) => {
        return (
          <TableActions
            isLoading={isLoading}
            actions={[
              {
                label: 'Delete',
                onClick: async () => await deleteMediaAction({ id: row.original.id }),
              },
            ]}
          />
        )
      },
    },
  ]

  return <DataTable columns={columns} data={items ?? []} />
}
