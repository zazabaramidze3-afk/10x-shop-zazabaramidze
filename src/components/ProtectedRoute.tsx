import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const ProtectedRoute = () => {
    const { user } = useAuth()
    const location = useLocation()

    if (!user.isLoggedIn) {
        return <Navigate to='/login' replace state={{ from: location }} />
    }

    return <Outlet />
}

export default ProtectedRoute
