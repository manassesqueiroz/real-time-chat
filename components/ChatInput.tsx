"use client"
import { supabaseBrowser } from "@/lib/supabase/browser"
import { Input } from "./ui/input"
import { toast } from "sonner"

export default function ChatInput() {
    const supabase = supabaseBrowser()
    const handleSendMassage = async (text: string) => {
        
        const { error } = await supabase.from("messages").insert({
            text: text,
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