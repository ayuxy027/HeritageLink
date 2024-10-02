import React, { createContext, useState, useEffect, useContext } from 'react'
import { supabase, getCurrentUser } from '../lib/supabaseClient'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const setUpUser = async () => {
      const currentUser = await getCurrentUser()
      if (mounted) {
        setUser(currentUser)
        setLoading(false)
      }
    }
    setUpUser()

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user ?? null
        if (mounted) {
          setUser(currentUser)
          setLoading(false)
        }
      }
    )

    return () => {
      mounted = false
      if (authListener && typeof authListener.unsubscribe === 'function') {
        authListener.unsubscribe()
      }
    }
  }, [])

  const value = {
    user,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}