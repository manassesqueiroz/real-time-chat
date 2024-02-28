import { supabaseServer } from '@/lib/supabase/server'
import { Suspense } from 'react'
import { ListMessages } from './ListMessage'
import InitMessages from '@/lib/store/InitMessages'

export default async function ChatMessage() {
    const supabase = supabaseServer()
    const {data} = await supabase
    .from('messages')
    .select("*, profile(*)")
    .order('created_at')

    console.log(data)
  return (
    <Suspense fallback={'Loading...'}>
         <ListMessages />
         <InitMessages messages={data || []}/>
    </Suspense>
  )
}
