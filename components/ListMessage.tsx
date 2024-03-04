"use client"

import { IMessage, useMessage } from "@/lib/store/messages"
import { supabaseBrowser } from "@/lib/supabase/browser"
import { ArrowDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import Message from "./Message"
import { DeleteAlert, EditMessage } from "./MessageActions"

export function ListMessages() {
  const [userScrolled, setUserScrolled] = useState(false)
  const [notifications, setNotifications] = useState(0)
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
            const scrollConteiner = scrollRef.current!
            if(scrollConteiner.scrollTop < scrollConteiner!.scrollHeight - scrollConteiner!.clientHeight - 20){
                setNotifications((current) => current + 1) 
            }
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

      if(scrollConteiner && !userScrolled){
        scrollConteiner.scrollTop = scrollConteiner.scrollHeight
      }
    },[ messages ])

    const handleOnScroll = () => {
      const scrollConteiner = scrollRef.current
      if(scrollConteiner){
        const isScroll = scrollConteiner.scrollTop < scrollConteiner.scrollHeight - scrollConteiner.clientHeight - 20
        setUserScrolled(isScroll)
        if(!isScroll){
          setNotifications(0)
        }
      }
    }

    const scrollDown = () => {
    // Run scroll to the end of the list
      scrollRef.current?.scrollTo(
        { 
          top: scrollRef.current.scrollHeight,
          behavior: 'smooth'
        }
      )
    }

    return (
      <>
        <div className="flex flex-1 flex-col p-4 overflow-y-auto scroll-smooth" 
          ref={scrollRef}
          onScroll={handleOnScroll}>
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
        {
            userScrolled && 
              <div className="absolute bottom-20 right-20">
                { 
                notifications 
                ? 
                  <p className="flex items-center text-xs text-green-300 cursor-pointer" onClick={scrollDown}>{notifications} new messages  <ArrowDown size={14}/></p> 
                : 
                  <div className="w-8 h-8 flex justify-center items-center border rounded-full cursor-pointer bg-gray-400 mx-auto hover:scale-110 transition-all"
                  onClick={scrollDown}>
                    <ArrowDown  size={20}/>
                  </div>
                }
                
              </div>
            }
      </>
    )
}