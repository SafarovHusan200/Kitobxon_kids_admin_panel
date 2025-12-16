"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { login as apiLogin, setAuthToken, getAuthToken, clearAuthToken } from "./api"

interface AuthContextType {
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if token exists on mount
    const token = getAuthToken()
    setIsAuthenticated(!!token)
    setLoading(false)
  }, [])

  const login = async (username: string, password: string) => {
    try {
      const response = await apiLogin(username, password)
      setAuthToken(response.token)
      setIsAuthenticated(true)
      router.push("/dashboard")
    } catch (error) {
      console.error("[v0] Login error:", error)
      throw error
    }
  }

  const logout = () => {
    clearAuthToken()
    setIsAuthenticated(false)
    router.push("/login")
  }

  return <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
