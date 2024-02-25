'use client'
import { supabaseBrowser } from '@/lib/supabase/browser'
import { useQuery } from '@tanstack/react-query'

const initUser = {
    id: '',
    email: '',
    display_name: '',
    avatar_url: '',
    created_at: '',
}
export default function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const supabase = supabaseBrowser()

      const { data } = await supabase.auth.getSession()
      if (data?.session?.user) {
          const { data: user, error } = await supabase
          .from('profile')
          .select('*')
          .eq('id', data.session.user.id)
          .single()

        return user
      }

      return initUser
    },
  })
}