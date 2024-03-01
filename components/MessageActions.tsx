'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useMessage } from "@/lib/store/messages"
import { supabaseBrowser } from "@/lib/supabase/browser"
import { toast } from "sonner"
import { Input } from "./ui/input"
import React, { useRef } from "react"
import { DialogClose } from "@radix-ui/react-dialog"
  
export function DeleteAlert() {
    const actionsMessage = useMessage((state)=> state.actionMessage)
    const optimistcDeleteMessage = useMessage((state)=> state.optimisticDeleteMessage)

    const handleDeleteMessage = async () => {
        const supabase = supabaseBrowser()

        const { error } = await supabase.from("messages")
        .delete()
        .eq("id", actionsMessage?.id!)
        .single()
        if(error){
            toast.error("Something went wrong", {
                description: error.message
            })
        }else{
            optimistcDeleteMessage(actionsMessage?.id!)
            toast.success("Message deleted")
        }
    }

return (
    <AlertDialog>
    <AlertDialogTrigger asChild>
        <button id="delete-trigger"></button>
    </AlertDialogTrigger>
    <AlertDialogContent>
        <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
            {actionsMessage?.id}
        </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleDeleteMessage}>Continue</AlertDialogAction>
        </AlertDialogFooter>
    </AlertDialogContent>
    </AlertDialog>
)
}
  
export function EditMessage() {
    const actionsMessage = useMessage((state)=> state.actionMessage)
    const inputRef = useRef<HTMLInputElement>(null)
    const optimistcEditMessage = useMessage((state)=> state.optimisticEditMessage)
    
    const handleEdit = async () => {
        const supabase = supabaseBrowser()
        const text = inputRef.current?.value.trim()

        if(!text){
            toast.error("Message cannot be empty")
            return
        } 
        const { error } = await supabase
        .from("messages")
        .update({
            text: text,
            is_edit: true
        })
        .eq("id", actionsMessage?.id!)
        .single()

        if(error){
            toast.error("Something went wrong", {
                description: error.message
            })
        }else {
            optimistcEditMessage({
                ...actionsMessage!,
                text,
                is_edit: true
            })
            toast.success("Message edited")
        }
    }

return (
    <Dialog>
    <DialogTrigger asChild>
        <button id="edit-trigger"></button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
        <DialogTitle>{actionsMessage?.profile?.display_name}</DialogTitle>
        <DialogDescription>
          {new Date(actionsMessage?.created_at!).toDateString()}
        </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <Input id="text-input" defaultValue={actionsMessage?.text} ref={inputRef} className="col-span-4" />
        </div>
        <DialogFooter>
            <DialogClose>
                <Button className="w-full" type="submit" onClick={handleEdit}>Save changes</Button>
            </DialogClose>
        </DialogFooter>
    </DialogContent>
    </Dialog>
)
}
