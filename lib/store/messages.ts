import { create } from "zustand";

export type IMessage = {
    created_at: string;
    id: string;
    is_edit: boolean;
    send_by: string;
    text: string;
    profile: {
        avatar_url: string | null;
        created_at: string;
        display_name: string | null;
        email: string | null;
        id: string;
    } | null;
}

interface MessageState {
    messages: IMessage[],
    actionMessage: IMessage | undefined,
    optimisticIds: string[],
    addMessage: (message: IMessage) => void,
    setActionMessage: (message: IMessage | undefined) => void,
    optimisticDeleteMessage: (messageId: string) => void,
    optimisticEditMessage: (message: IMessage) => void,
    setOptimisticIds: (id: string) => void,
}
export const useMessage = create<MessageState>()((set) => ({
    messages: [],
    optimisticIds: [],
    actionMessage: undefined,
    setOptimisticIds(id: string) {
        set((state) => ({
             optimisticIds: [...state.optimisticIds, id] }))
    },
    addMessage: (newMessages: IMessage) => {
        set((state) => ({
            messages: [...state.messages, newMessages],
        }))
    },
    setActionMessage: (message) => set(() => ({
        actionMessage: message
    })),
    optimisticDeleteMessage: (messageId)=>set((state) => {
        return {
            messages: state.messages.filter((message) => message.id !== messageId)
        }
    }) 
    ,
    optimisticEditMessage: (message: IMessage) => set((state) => {
        return {
            messages: state.messages.map((m) => {
                if(m.id === message.id){
                    m.text = message.text
                    m.is_edit = message.is_edit
                }
                return m
            })
        }
    })
}))