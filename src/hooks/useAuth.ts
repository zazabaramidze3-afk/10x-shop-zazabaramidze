import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import type { AuthContextValue } from '../context/AuthContext'


const useAuth = (): AuthContextValue => {
    const context = useContext(AuthContext)

    if (context === null) {
        throw new Error('useAuth must be used inside AuthProvider')
    }

    return context
}

export default useAuth
