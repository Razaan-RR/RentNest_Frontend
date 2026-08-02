'use client'

import { createContext, useContext, useState } from 'react'
import { useRouter } from 'next/navigation'

import { getUser, removeAuthData } from '@/lib/storage'

const AuthContext = createContext<any>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(() => getUser())

  const router = useRouter()

  const logout = () => {
    removeAuthData()
    setUser(null)
    router.replace('/login')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
