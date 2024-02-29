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
import { useMessage } from "@/lib/store/messages"
import { supabaseBrowser } from "@/lib/supabase/browser"
import { toast } from "sonner"
  
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
  