import { Button } from "@/components/ui/button";

export default function Page() {
  return (
  <div className="max-w-3xl mx-auto md:py-10 h-screen">
    <div className="w-full border rounded-md">
      <div className="h-20">
        <div className="flex justify-between items-center p-5 border-b">
          <div>
            <h1 className="font-bold text-xl">Daily Chat</h1>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 animate-pulse rounded-full"></div>
              <span className="text-gray-400 text-sm">2 online</span>
            </div>
          </div>
         <Button variant={"default"}>Login</Button>
        </div>
      </div>
    </div>
  </div>
  );
}
