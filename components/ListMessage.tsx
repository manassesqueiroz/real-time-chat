"use client"

import { IMessage, useMessage } from "@/lib/store/messages"
import { supabaseBrowser } from "@/lib/supabase/browser"
import { useEffect, useRef } from "react"
import Message from "./Message"
import { DeleteAlert, EditMessage } from "./MessageActions"
import { toast } from "sonner"

export function ListMessages() {
    const {
      messages,
      addMessage, 
      optimisticIds,
      optimisticDeleteMessage,
      optimisticEditMessage
    } = useMessage((state)=> state)
   const scrollRef = useRef<HTMLDivElement>(null)

    const supabase = supabaseBrowser()
    useEffect(() =>{
      const channel = supabase
      .channel('chat-room')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', }, 
      async (payload) => {
        if(!optimisticIds.includes(payload.new.id)) {
          const { data, error } = await supabase
          .from('profile')
          .select("*")
          .eq('id', payload.new.send_by)
          .single()
  
          if(error){
            toast.error(error.message )
          }else{
            const newMesage = {
              ...payload.new,
              profile: data
            }
            addMessage(newMesage as IMessage) 
          }
        }
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'messages', }, 
      async (payload) => {
        optimisticEditMessage(payload.new as IMessage)
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'messages', }, 
      async (payload) => {
        optimisticDeleteMessage(payload.old.id)
      })
      .subscribe()

      return () => {
        channel.unsubscribe()
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[messages])

    useEffect(() =>{
      const scrollConteiner = scrollRef.current

      if(scrollConteiner){
        scrollConteiner.scrollTop = scrollConteiner.scrollHeight
      }
    },[ messages])

    return (
        <div className="flex flex-1 flex-col p-4 overflow-y-auto scroll-smooth" ref={scrollRef}>
         <div className="flex flex-1"></div>
         <div className="space-y-8">
            {messages.map((message, index) => {
              return (
                <Message message={message} key={index} />
              )
            })}
        </div>
        <DeleteAlert />
        <EditMessage />
      </div>
    )
}