import { IMessage } from '@/lib/store/messages'
import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import { AvatarFallback } from '@radix-ui/react-avatar'
import { MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useUser from '@/app/hook/useUser'
export default function Message({message}: {message: IMessage}) {
  const {data} = useUser()

  return (
    <div className="flex gap-2" key={message.id}>
        <Avatar>
            <AvatarImage alt={message.profile?.avatar_url!} src={message.profile?.avatar_url!}/>
            <AvatarFallback />
        </Avatar>
        <div className="flex-1">
          <div className='flex justify-between'>
              <div className="flex items-center gap-x-2">
                  <span className="text-base">{message.profile?.display_name}</span>
                  <span className="text-xs text-gray-400">{new Date(message.created_at).toDateString()}</span>
              </div>
              {data?.id === message.send_by && <EditMenu />}  
            </div>
            <p className="text-sm text-gray-400">{message.text}</p>
        </div>
    </div>
  )
}


const EditMenu = () => {
    return (
      <DropdownMenu >
      <DropdownMenuTrigger><MoreHorizontal /></DropdownMenuTrigger>
      <DropdownMenuContent  align='end'>
        <DropdownMenuLabel>Action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    )
}