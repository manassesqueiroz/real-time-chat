"use client"
import { supabaseBrowser } from "@/lib/supabase/browser"
import { Input } from "./ui/input"
import { toast } from "sonner"
import { v4 as uuidv4 } from 'uuid';
import useUser from "@/app/hook/useUser"
import { IMessage, useMessage } from "@/lib/store/messages";

export default function ChatInput() {
    const { data } = useUser()
    const supabase = supabaseBrowser()

    const { addMessage, setOptimisticIds } = useMessage((state) => state)

    const handleSendMassage = async (text: string) => {
        
        if(!text) return toast.error("Message cannot be empty")
        const newMessage = {
            id: uuidv4(),
            text,
            is_edit: false,
            send_by: data?.id,
            created_at: new Date().toISOString(),
            profile: {
                id: data?.id,
                email: data?.email,
                display_name: data?.display_name,
                avatar_url: data?.avatar_url,
                created_at: data?.created_at,
            },
        }
        addMessage(newMessage as IMessage)
        setOptimisticIds(newMessage.id)
        
        const { error } = await supabase.from("messages").insert({
            id: newMessage.id,
            send_by: newMessage.send_by,
            is_edit: newMessage.is_edit,
            text: newMessage.text,
        })
        if(error){
            toast.error("Something went wrong", {
                description: error.message
            })  
        }
    }
    return (
        <div className="p-4">
            <Input placeholder="send message" onKeyDown={(e)=>{
                if(e.key === "Enter"){
                    handleSendMassage(e.currentTarget.value)
                    e.currentTarget.value = ""
                }
            }} />
        </div>
    )
}

