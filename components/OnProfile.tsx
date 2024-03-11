'use client'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Profile, useProfile } from '@/lib/store/profile'
import { supabaseBrowser } from '@/lib/supabase/browser'
import { Eye, MessageCircle } from 'lucide-react'
import { useState } from "react"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
  
export default function OnProfile() {
    const [onUsers, setOnUsers] = useState<Profile[]>()
    const { presence } = useProfile((state) => state)
    const supabase = supabaseBrowser()

    const handleUsers = async () => {
        const allIdUsers: string[] = presence.map((user) =>  user.user_id)
        console.log(allIdUsers)

        const { data, error } = await supabase
        .from('profile')
        .select('*')
        .in('id', allIdUsers)

        if(error){
            toast.error(error.message)
        }else{
            setOnUsers(data)
        }
    }
 

  return (
    <Sheet>
    <SheetTrigger onClick={handleUsers} className='flex items-center gap-2 font-bold border p-2'>
        Users <Eye size={14} />
    </SheetTrigger>
    <SheetContent side={"left"}>
      <SheetHeader>
        <SheetTitle>On Users</SheetTitle>
        <SheetDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </SheetDescription>
      </SheetHeader>
        <div className='mt-4'>
            {
                onUsers ? onUsers.map((user) => (
                    <div key={user.id} className='flex items-end gap-x-4 border-b pb-1 border-purple-600 rounded-xl'>
                    <div>
                        <Avatar className='border-2 border-gray-400'>
                            <AvatarImage alt={user.display_name!} src={user.avatar_url!}/>
                            <AvatarFallback />
                        </Avatar>
                    </div>
                    <div className='flex justify-between w-full items-end'>
                        <p className="text-sm text-gray-400">{user.display_name}</p>
                        <div className="flex gap-x-2 mr-4 cursor-pointer text-gray-400">
                            <MessageCircle size={18}/>
                        </div>
                    </div>
                </div>
                )) : 
                <p className="text-sm text-gray-400">No on users</p>
            }
        </div>
    </SheetContent>
  </Sheet>
  )
}
