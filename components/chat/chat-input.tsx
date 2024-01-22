'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useClientTranslation } from '@/hooks/use-i18n'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Settings, Smile } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface ChatInputProps {
  name: string
  apiUrl: string
  query: Record<string, any>
  type: 'channel' | 'member'
}

const FormSchema = z.object({
  content: z.string().min(1)
})

const ChatInput = ({ name, apiUrl, query, type }: ChatInputProps) => {
  const { t } = useClientTranslation()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: ''
    }
  })
  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log('[ values ] >', values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="m-4 mb-6 px-2 flex bg-zinc-200/90 dark:bg-zinc-700/75 items-center rounded-md justify-around">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="p-1 w-7 h-7 border-transparent rounded-full text-sm bg-zinc-500 hover:bg-zinc-600 dark:hover:bg-zinc-200 hover:text-white dark:bg-zinc-400 text-white dark:text-[#313338]"
                  >
                    <Plus></Plus>
                  </Button>
                  <Input className="bg-transparent outline-none border-none" placeholder={`${t('Message')} #${name}`} {...field} />
                  <Button variant="ghost" size="icon" className="w-7 h-7 hover:bg-transparent">
                    <Smile></Smile>
                  </Button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export default ChatInput
