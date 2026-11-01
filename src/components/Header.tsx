import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import useAuth from '../hooks/useAuth'
import useCart from '../hooks/useCart'
import { getCartCount } from '../utils/cart'

const linkStyles =
  'whitespace-nowrap text-sm font-medium transition duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900'

const Header = () => {
  const { user, logout } = useAuth()
  const { items } = useCart()
  const cartCount = getCartCount(items)

  // მობილურზე მენიუ ღიაა თუ დახურული
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const closeMenu = (): void => {
    setIsMenuOpen(false)
  }

  const handleLogout = (): void => {
    logout()
    closeMenu()
  }

  // ერთი და იგივე ბმულები ორ ადგილას გამოიყენება: კომპიუტერის ზოლში და მობილურის მენიუში
  const navLinks = (
    <>
      <Link to='/cart' onClick={closeMenu} className={linkStyles}>
        Cart ({cartCount})
      </Link>

      {user.isLoggedIn ? (
        <>
          <span className='text-sm text-neutral-600'>{user.username}</span>
          <Button variant='secondary' onClick={handleLogout}>
            Logout
          </Button>
        </>
      ) : (
        <Link to='/login' onClick={closeMenu} className={linkStyles}>
          Login
        </Link>
      )}
    </>
  )

  return (
    <header className='border-b border-neutral-200'>
      <div className='mx-auto flex h-16 max-w-6xl items-center justify-between px-4'>
        <Link
          to='/'
          onClick={closeMenu}
          className='whitespace-nowrap text-lg font-semibold transition duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900'
        >
          10X Shop
        </Link>

        {/* კომპიუტერი: 640px-დან ზემოთ ბმულები ერთ ხაზზეა */}
        <nav aria-label='Main' className='hidden items-center gap-4 sm:flex'>
          {navLinks}
        </nav>

        {/* მობილური: 640px-ზე ქვემოთ მხოლოდ ბურგერ ღილაკი */}
        <Button
          variant='secondary'
          className='sm:hidden'
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls='mobile-menu'
          onClick={() => setIsMenuOpen((prevOpen) => !prevOpen)}
        >
          {isMenuOpen ? '✕' : '☰'}
        </Button>
      </div>

      {isMenuOpen && (
        <nav
          id='mobile-menu'
          aria-label='Mobile'
          className='flex flex-col items-start gap-4 border-t border-neutral-200 px-4 py-4 sm:hidden'
        >
          {navLinks}
        </nav>
      )}
    </header>
  )
}

export default Header
