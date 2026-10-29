import { useState } from 'react'
import type { ReactNode } from 'react'
import type { AuthUser } from '../types/user'
import { AuthContext } from './AuthContext'
import type { AuthContextValue } from './AuthContext'

interface AuthProviderProps {
    children: ReactNode
}

const GUEST_USER: AuthUser = { username: '', isLoggedIn: false }

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<AuthUser>(GUEST_USER)

    const login = (username: string): void => {
        setUser({ username, isLoggedIn: true })
    }

    const logout = (): void => {
        setUser(GUEST_USER)
    }

    const value: AuthContextValue = { user, login, logout }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider