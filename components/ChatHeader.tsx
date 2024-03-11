"use client"
import { useProfile } from "@/lib/store/profile";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import OnProfile from "./OnProfile";
import { Button } from "./ui/button";

export function ChatHeader({ session }: { session: Session | null }) {
    const supabase = supabaseBrowser()
    const { presence } = useProfile((state) => state)
    const router = useRouter()

    const handleLoginWithGithub = async () => {
        await supabase.auth.signInWithOAuth({
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
        <div className="w-full">
            <div className="flex justify-between items-center p-4 border-b">
                <div>
                    <h1 className="font-bold text-xl">Daily Chat</h1>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 animate-pulse rounded-full"></div>
                        <span className="text-gray-400 text-sm">{presence.length > 0 ? presence.length : 0} online</span>
                    </div>
                </div>
                <div className="flex gap-x-2">
                    
                    {session ? (
                        <>
                            <OnProfile />
                            <Button onClick={handleLogout} variant={"destructive"}>logout</Button>
                        </>
                    ) : (
                        <Button onClick={handleLoginWithGithub} variant={"default"}>Login</Button>
                    )}
                </div>
            </div>
        </div>
    )
}