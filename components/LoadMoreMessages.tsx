'use client'
import { LIMIT_MESSAGE } from '@/lib/constant'
import { IMessage, useMessage } from '@/lib/store/messages'
import { supabaseBrowser } from '@/lib/supabase/browser'
import { getFromAndTo } from '@/lib/utils'
import { Shell } from 'lucide-react'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { toast } from 'sonner'


export default function LoadMoreMessages() { 
    const {ref, inView} = useInView()
    const {page, setMessages} = useMessage((state)=> state)


    const handleGetMoreMessages = async () => {
        const {from, to} = getFromAndTo(page, LIMIT_MESSAGE)
        const supabase = supabaseBrowser()

        const { data, error } = await supabase
        .from('messages')
        .select("*, profile(*)")
        .range(from , to)
        .order("created_at", { ascending: false })
        if(error){
            toast.error(error.message)
        }else{
            setMessages(data.reverse() as IMessage[])
        }
    } 
    useEffect(() => {
        if(inView){
            handleGetMoreMessages()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[inView])
                                                      
  return (
    <div ref={ref} className='flex justify-center p-2'>
        <Shell className='animate-spin'/>
    </div>
  )
}
