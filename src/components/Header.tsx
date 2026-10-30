import { Link } from 'react-router-dom'
import Button from './Button'
import useAuth from '../hooks/useAuth'

const Header = () => {
  // user = { username, isLoggedIn }, logout = ფუნქცია, რომელიც user-ს აბრუნებს guest-ზე
  const { user, logout } = useAuth()

  return (
    <header className='border-b border-neutral-200'>
      <div className='mx-auto flex h-16 max-w-6xl items-center justify-between px-4'>
        <Link
          to='/'
          className='text-lg font-semibold transition duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900'
        >
          10X Shop
        </Link>

        {user.isLoggedIn ? (
          <div className='flex items-center gap-3'>
            <span className='text-sm text-neutral-600'>{user.username}</span>
            <Button variant='secondary' onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Link
            to='/login'
            className='text-sm font-medium transition duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900'
          >
            Login
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header
