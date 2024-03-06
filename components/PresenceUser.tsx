"use client"
import useUser from '@/app/hook/useUser'
import { Presence, useProfile } from '@/lib/store/profile'
import { supabaseBrowser } from '@/lib/supabase/browser'
import { useEffect } from 'react'


export default function PresenceUser() {
    const { data } = useUser()
    const supabase = supabaseBrowser()

    useEffect(()=> {
        const channel = supabase.channel('room_01')
        channel 
                .on("presence", { event: "sync" }, () => {
                    
                    let presence: Presence[] = []
                    for (const key in channel.presenceState()) {
                            console.log(channel.presenceState()[key][0])
                            presence.push(channel.presenceState()[key][0] as Presence)
                    }
                    useProfile.setState({ presence })
                })
               .subscribe(async (status) => {
                    if(status === "SUBSCRIBED"){
                        await channel.track({
                            online_at: new Date().toISOString(),
                            user_id: data?.id
                        })  
                    }
                })
          
    })
  return <></>
}
