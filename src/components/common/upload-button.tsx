'use client'

import { getSignedURL } from '@/actions/s3'
import { useState } from 'react'
import { Button } from '../ui/button'
import { ALLOWED_AUDIO_FILE_TYPES } from '@/constants'
import { computeSHA256 } from '@/lib/sha256'
import { Upload } from 'lucide-react'
import DialogBase from './dialog-base'

export const UploadButton = ({ className }: { className?: string }) => {
  const [open, setIsOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    if (file) {
      const signedURLResult = await getSignedURL({
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        checksum: await computeSHA256(file),
      })

      if (signedURLResult.failure !== undefined) {
        console.error(signedURLResult.failure)
        return
      }

      const { url } = signedURLResult.success

      await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      })
    }
    setLoading(false)
    setIsOpen(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setFile(file)

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }

    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    } else {
      setPreviewUrl(null)
    }
  }

  return (
    <DialogBase
      controlled={{ open, onOpenChange: setIsOpen }}
      title="Upload"
      triggerSlot={<Button type="submit">Upload</Button>}
    >
      <form onSubmit={handleSubmit}>
        <label className="group flex cursor-pointer">
          <div className="flex w-full flex-col items-center justify-center rounded border border-dashed pb-12 pt-8 transition-all group-hover:border-neutral-200/15">
            <Upload className="mb-3 text-neutral-500 transition-all group-hover:-translate-y-1 group-hover:text-neutral-400" />
            <h3 className="text-xl">Select files</h3>
            <p className="mt-2 max-w-60 text-center text-xs font-normal text-neutral-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          <input
            className="hidden flex-1 border-none bg-transparent outline-none"
            name="media"
            type="file"
            accept={ALLOWED_AUDIO_FILE_TYPES.join(',')}
            onChange={handleFileChange}
          />
        </label>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm font-normal text-emerald-500">{file?.name}</p>
          <Button className={className} type="submit" disabled={!file || loading}>
            Submit
          </Button>
        </div>
      </form>
    </DialogBase>
  )
}
