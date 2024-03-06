import { ChatHeader } from "@/components/ChatHeader";
import ChatInput from "@/components/ChatInput";
import ChatMessage from "@/components/ChatMessage";
import PresenceUser from "@/components/PresenceUser";
import { supabaseServer } from "@/lib/supabase/server";

export default async function Page() {
  return (
  <div className="max-w-3xl mx-auto md:py-10 h-screen">
    <div className="flex flex-col h-full border rounded-md boder relative ">
      <ChatHeader />
      <PresenceUser />
      <ChatMessage />
      <ChatInput />
    </div>
  </div>
  );
}
