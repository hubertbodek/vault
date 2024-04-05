import { DialogTrigger } from '@radix-ui/react-dialog'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface DialogBaseProps {
  title: string
  children: React.ReactNode
  triggerSlot: React.ReactNode
  className?: string
  controlled?: {
    open: boolean
    onOpenChange: (open: boolean) => void
  }
}

export default function DialogBase({
  title,
  triggerSlot,
  children,
  className,
  controlled,
}: DialogBaseProps) {
  return (
    <Dialog open={controlled?.open} onOpenChange={controlled?.onOpenChange}>
      <DialogTrigger asChild>{triggerSlot}</DialogTrigger>
      <DialogContent className={cn('px-0 pb-8 pt-4', className)}>
        <DialogHeader>
          <DialogTitle className="px-8 text-left">{title}</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="flex flex-col gap-y-6 px-8">{children}</div>
      </DialogContent>
    </Dialog>
  )
}
