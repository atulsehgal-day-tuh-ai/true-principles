import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { createClient } from '@supabase/supabase-js'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Safety check: Prevent crash if keys are missing
    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase keys are missing in .env.local')
      return
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        // Safe localStorage access
        const role = window.localStorage.getItem('intended_role')
        
        if (role && session?.user) {
           await supabase.auth.updateUser({
             data: { role: role }
           })
           window.localStorage.removeItem('intended_role')
        }
        
        router.push('/') // Redirect to home
      }
    })

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe()
      }
    }
  }, [router])

  return (
    <div style={{ background: '#000', height: '100vh', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <p>Finalizing login...</p>
    </div>
  )
}