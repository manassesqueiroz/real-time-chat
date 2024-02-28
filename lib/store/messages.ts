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
    addMessage: (message: IMessage) => void
}
export const useMessage = create<MessageState>()((set) => ({
    messages: [],
    addMessage: (message: IMessage) => {
        set((state) => ({
            messages: [...state.messages, message]
        }))
    }
}))