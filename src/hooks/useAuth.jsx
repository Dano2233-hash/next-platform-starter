import React, { createContext, useContext, useState, useEffect } from 'react'

const STORAGE_KEY = 'dano_admin_auth'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true'
    } catch (e) {
      return false
    }
  })

  const login = (username, password) => {
    if (username === 'dano.js' && password === 'lawa2233') {
      try {
        localStorage.setItem(STORAGE_KEY, 'true')
      } catch (e) {
        console.error('Failed to set auth in local storage:', e)
      }
      setIsAdmin(true)
      return { success: true }
    } else {
      return { success: false, message: 'Invalid admin username or password.' }
    }
  }

  const logout = () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (e) {
      console.error('Failed to remove auth from local storage:', e)
    }
    setIsAdmin(false)
  }

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
