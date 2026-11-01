import { useState } from 'react'
import type { ReactNode } from 'react'
import type { AuthUser } from '../types/user'
import { AuthContext } from './AuthContext'
import type { AuthContextValue } from './AuthContext'

interface AuthProviderProps {
    children: ReactNode
}

const GUEST_USER: AuthUser = { username: '', isLoggedIn: false }
const STORAGE_KEY = 'shop_user'

// ვკითხულობთ შენახულ username-ს: თუ არის, მომხმარებელი შესულია, თუ არა, სტუმარია
const loadUser = (): AuthUser => {
    const username = localStorage.getItem(STORAGE_KEY)
    return username ? { username, isLoggedIn: true } : GUEST_USER
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<AuthUser>(loadUser)

    const login = (username: string): void => {
        localStorage.setItem(STORAGE_KEY, username)
        setUser({ username, isLoggedIn: true })
    }

    const logout = (): void => {
        localStorage.removeItem(STORAGE_KEY)
        setUser(GUEST_USER)
    }

    const value: AuthContextValue = { user, login, logout }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
