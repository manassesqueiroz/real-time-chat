export function ChatMessage() {
    return (
        <div className="flex gap-2">
            <div className="bg-green-400 h-10 w-10 rounded-full"></div>
            <div className="flex-1">
                <div className="flex items-center gap-1">
                    <span className="text-base">Joe Due</span>
                    <span className="text-xs text-gray-400">{new Date().toDateString()}</span>
                </div>
                <p className="text-sm">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse voluptas, minus molestias atque eos, doloribus consequuntur placeat animi aut recusandae ipsam similique? Quasi quisquam commodi, temporibus minus ea porro assumenda.</p>
            </div>
        </div>
    )
}