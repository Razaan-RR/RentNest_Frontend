'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { getUser, removeAuthData } from '@/lib/storage'

interface User {
  id: string
  name: string
  email: string
  role: 'TENANT' | 'LANDLORD' | 'ADMIN'
}

interface AuthContextType {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    const storedUser = getUser() as User | null

    const timer = setTimeout(() => {
      setUser(storedUser)
      setLoading(false)
    }, 0)

    return () => clearTimeout(timer)
  }, [])

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
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}
