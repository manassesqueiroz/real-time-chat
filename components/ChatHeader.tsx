'use client'
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import useUser from "@/app/hook/useUser";
import { SkeletonProfile } from "./squeletons/profile";

export function ChatHeader() {
    const { data , isLoading} = useUser()
    const router = useRouter()

    const handleLoginWithGithub = async () => {
        const supabse = supabaseBrowser()
        await supabse.auth.signInWithOAuth({
          provider: 'github',
          options: {
            redirectTo: location.origin + '/auth/callback'
          }
        })
      }

    const handleLogout = async () => {
        const supabse = supabaseBrowser()
        await supabse.auth.signOut()
        router.refresh()
    }
    return (
        <div className="h-20">
            <div className="flex justify-between items-center p-5 border-b">
                <div>
                    <h1 className="font-bold text-xl">Daily Chat</h1>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 animate-pulse rounded-full"></div>
                        <span className="text-gray-400 text-sm">2 online</span>
                    </div>
                </div>
                <div className="flex gap-x-2">

                    {isLoading ?
                    (
                        <SkeletonProfile />
                    ) : data?.id ?
                    (
                    <>
                        <Avatar>
                            <AvatarImage src={data.avatar_url || ''} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Button onClick={handleLogout} variant={"destructive"}>logout</Button>
                    </>
                    ) : 
                    (
                        <Button onClick={handleLoginWithGithub} variant={"default"}>Login</Button>
                    )
                    }
                </div>
            </div>
        </div>
    )
}