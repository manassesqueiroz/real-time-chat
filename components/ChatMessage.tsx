import { LIMIT_MESSAGE } from '@/lib/constant'
import InitMessages from '@/lib/store/InitMessages'
import { supabaseServer } from '@/lib/supabase/server'
import { Suspense } from 'react'
import { ListMessages } from './ListMessage'

export default async function ChatMessage() {
    const supabase = supabaseServer()
    const { data: { session } } = await supabase.auth.getSession()
    const { data } = await supabase
    .from('messages')
    .select("*, profile(*)")
    .range(0, LIMIT_MESSAGE)
    .order('created_at', { ascending: false })
    

  return (
    <Suspense fallback={'Loading...'}>
    {session 
    ? (
      <>
        <ListMessages />
        <InitMessages messages={data?.reverse() || []}/>
      </>
    )
    : (
      <div className='flex-1 justify-center items-center flex flex-col'>
        <h1 className='text-4xl font-bold'>Welcome to Daily Chat</h1>
        <p className='text-purple-600 font-bold text-2xl'>Please login</p>
      </div>
    )}
    </Suspense>
  )
}
