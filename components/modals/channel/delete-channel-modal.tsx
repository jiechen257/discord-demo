'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useClientTranslation } from '@/hooks/use-i18n'

import { useModal } from '@/hooks/use-modal-state'
import axios from 'axios'
import { CheckCircle2, XCircle } from 'lucide-react'
import { useState } from 'react'

import qs from 'query-string'
import { useRouter } from 'next/navigation'

const DeleteChannelModal = () => {
  const { type, isOpen, onClose, data } = useModal()
  const { t } = useClientTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { server, channel } = data
  const isOpened = isOpen && type === 'deleteChannel'
  const onCheck = async () => {
    try {
      setIsLoading(true)
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id
        }
      })
      await axios.delete(url)
      onClose()
      router.replace(`/servers/${server?.id}`)
      router.refresh()
    } catch (error) {
      console.error('[ DELETE_CHANNEL ] >', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpened} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0">
        <DialogHeader className="p-8">
          <DialogTitle className="text-black text-center text-3xl font-bold">{t('Delete Channel')}</DialogTitle>
          <DialogDescription className="text-center text-rose-300 ">
            {t('Are you sure to delete')}
            <span className="ml-1 font-bold">{channel?.name}</span>?
          </DialogDescription>
          <div className="flex  gap-4">
            <Button onClick={onCheck} disabled={isLoading} variant="secondary" className="flex-1">
              <CheckCircle2 />
            </Button>
            <Button disabled={isLoading} onClick={onClose} variant="secondary" className="flex-1">
              <XCircle />
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
export default DeleteChannelModal
