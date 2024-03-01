"use client"
import { supabaseBrowser } from "@/lib/supabase/browser"
import { Input } from "./ui/input"
import { toast } from "sonner"
import { v4 as uuidv4 } from 'uuid';
import useUser from "@/app/hook/useUser"
import { IMessage, useMessage } from "@/lib/store/messages";

export default function ChatInput() {
    const { data } = useUser()
    const addMessage = useMessage((state) => state.addMessage)
    const supabase = supabaseBrowser()

    const handleSendMassage = async (text: string) => {
        
        if(!text) return toast.error("Message cannot be empty")
        const NewMessage = {
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

        const { error } = await supabase.from("messages").insert({
            id: NewMessage.id,
            send_by: NewMessage.send_by,
            is_edit: NewMessage.is_edit,
            text: NewMessage.text,
        })
        if(error){
            toast.error("Something went wrong", {
                description: error.message
            })
        }

        addMessage(NewMessage as IMessage)
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

