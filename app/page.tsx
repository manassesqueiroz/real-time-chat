import { ChatHeader } from "@/components/ChatHeader";
import { supabaseServer } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = supabaseServer()
  const { data } = await supabase.auth.getSession()
  return (
  <div className="max-w-3xl mx-auto md:py-10 h-screen">
    <div className="w-full border rounded-md">
      <ChatHeader user={data?.session?.user} />
    </div>
  </div>
  );
}
