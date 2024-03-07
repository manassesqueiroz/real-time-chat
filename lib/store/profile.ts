import { create } from "zustand";

export type Presence = {
    user_id: string,
    online_at: string,
    presence_ref:string,
}

export type Profile = {
    avatar_url: string | null;
    created_at: string;
    display_name: string | null;
    email: string | null;
    id: string;
}


interface ProfileState {
    presence: Presence[],
}

export const useProfile = create<ProfileState>()((set) => ({
    presence: []
}))