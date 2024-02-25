'use client'
import { supabaseBrowser } from "@/lib/supabase/browser";
import { Button } from "./ui/button";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export function ChatHeader({user} : {user: User | undefined }) {
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
                {user ? (
                    <Button onClick={handleLogout} variant={"destructive"}>logout</Button>
                ): (
                    <Button onClick={handleLoginWithGithub} variant={"default"}>Login</Button>
                )}
                
            </div>
        </div>
    )
}