import { ChatHeader } from "@/components/ChatHeader";
import ChatInput from "@/components/ChatInput";
import { ChatMessage } from "@/components/ChatMessage";
import { Input } from "@/components/ui/input";
import { supabaseServer } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = supabaseServer()
  const { data } = await supabase.auth.getSession()
  console.log(data.session?.user)
  return (
  <div className="max-w-3xl mx-auto md:py-10 h-screen">
    <div className="flex flex-col h-full border rounded-md boder">
      <ChatHeader />
      <div className="flex flex-1 flex-col p-4 overflow-y-auto">
         <div className="flex flex-1"></div>
         <div className="space-y-8">
            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map((i) => {
              return (
               <ChatMessage key={i}/>
              )
            })}
        </div>
      </div>
      <ChatInput />
    </div>
  </div>
  );
}
