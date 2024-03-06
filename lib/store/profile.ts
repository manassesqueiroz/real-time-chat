import { create } from "zustand";

export type Presence = {
    user_id: string,
    online_at: string,
    presence_ref:string,
}

interface ProfileState {
    presence: Presence[],
}

export const useProfile = create<ProfileState>()((set) => ({
    presence: []
}))