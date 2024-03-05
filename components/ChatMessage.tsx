import { supabaseServer } from '@/lib/supabase/server'
import { Suspense } from 'react'
import { ListMessages } from './ListMessage'
import InitMessages from '@/lib/store/InitMessages'
import { LIMIT_MESSAGE } from '@/lib/constant'

export default async function ChatMessage() {
    const supabase = supabaseServer()
    const { data } = await supabase
    .from('messages')
    .select("*, profile(*)")
    .range(0, LIMIT_MESSAGE)
    .order('created_at', { ascending: false })
    

  return (
    <Suspense fallback={'Loading...'}>
         <ListMessages />
         <InitMessages messages={data?.reverse() || []}/>
    </Suspense>
  )
}
