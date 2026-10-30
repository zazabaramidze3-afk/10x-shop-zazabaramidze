import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const ProtectedRoute = () => {
    const { user } = useAuth()

    if (!user.isLoggedIn) {
        return <Navigate to='/login' replace />
    }

    return <Outlet />
}

export default ProtectedRoute
