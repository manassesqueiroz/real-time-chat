"use client"

import { IMessage, useMessage } from "@/lib/store/messages"
import Message from "./Message"
import { DeleteAlert } from "./MessageActions"

export function ListMessages() {
    const messages = useMessage((state)=> state.messages)
    return (
        <div className="flex flex-1 flex-col p-4 overflow-y-auto">
         <div className="flex flex-1"></div>
         <div className="space-y-8">
            {messages.map((message, index) => {
              return (
                <Message message={message} key={index} />
              )
            })}
        </div>
        <DeleteAlert />
      </div>
    )
}