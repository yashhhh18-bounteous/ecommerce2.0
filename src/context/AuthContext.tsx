import { createContext, useState, useEffect } from "react"
import type { ReactNode } from "react"

export type User = {
  id: string
  username: string
  email: string
}

type AuthContextType = {
  user: User | null
  login: (username: string, password: string) => boolean
  signup: (username: string, email: string, password: string) => boolean
  logout: () => void
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextType | null>(null)

const DUMMY_USERS = [
  { id: "1", username: "john_doe", email: "john@example.com", password: "password123" },
  { id: "2", username: "jane_smith", email: "jane@example.com", password: "pass456" },
  { id: "3", username: "admin", email: "admin@example.com", password: "admin123" },
  { id: "4", username: "testuser", email: "test@example.com", password: "test123" },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("currentUser")
    return storedUser ? JSON.parse(storedUser) : null
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user))
    } else {
      localStorage.removeItem("currentUser")
    }
  }, [user])

  const login = (username: string, password: string): boolean => {
    const foundUser = DUMMY_USERS.find(
      (u) => u.username === username && u.password === password
    )

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      return true
    }
    return false
  }

  const signup = (username: string, email: string, password: string): boolean => {
    const existingUser = DUMMY_USERS.find((u) => u.username === username)
    if (existingUser) {
      return false
    }

    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password,
    }

    DUMMY_USERS.push(newUser)

    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)
    return true
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
