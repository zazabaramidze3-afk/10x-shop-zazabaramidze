import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Button from './Button'
import useAuth from '../hooks/useAuth'
import useCart from '../hooks/useCart'
import useTheme from '../hooks/useTheme'
import { getCartCount } from '../utils/cart'

const linkStyles =
  'whitespace-nowrap text-sm font-medium transition duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900'

// NavLink-ს className-ში isActive გადმოეცემა: მიმდინარე გვერდის ბმული გამოიკვეთება
const getNavLinkStyles = ({ isActive }: { isActive: boolean }): string =>
  `${linkStyles} ${isActive ? 'underline underline-offset-4' : ''}`

const Header = () => {
  const { user, logout } = useAuth()
  const { items } = useCart()
  const cartCount = getCartCount(items)
  const { theme, toggleTheme } = useTheme()

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
      <NavLink to='/' end onClick={closeMenu} className={getNavLinkStyles}>
        Catalog
      </NavLink>

      <NavLink
        to='/cart'
        onClick={closeMenu}
        aria-label={`Cart, ${cartCount} items`}
        className={({ isActive }) => `${linkStyles} relative inline-flex p-1 ${isActive ? 'opacity-100' : 'opacity-70'}`}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='h-6 w-6'
          aria-hidden='true'
        >
          <circle cx='8' cy='21' r='1' />
          <circle cx='19' cy='21' r='1' />
          <path d='M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12' />
        </svg>
        {cartCount > 0 && (
          <span className='absolute -right-2 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-neutral-900 px-1 text-xs font-medium text-white'>
            {cartCount}
          </span>
        )}
      </NavLink>

      {user.isLoggedIn ? (
        <>
          <span className='max-w-40 truncate text-sm text-neutral-600'>{user.username}</span>
          <button
            type='button'
            aria-label='Logout'
            title='Logout'
            onClick={handleLogout}
            className={`${linkStyles} inline-flex p-1`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='h-5 w-5'
              aria-hidden='true'
            >
              <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
              <polyline points='16 17 21 12 16 7' />
              <line x1='21' x2='9' y1='12' y2='12' />
            </svg>
          </button>
        </>
      ) : (
        <NavLink
          to='/login'
          onClick={closeMenu}
          aria-label='Login'
          title='Login'
          className={({ isActive }) => `${linkStyles} inline-flex p-1 ${isActive ? 'opacity-100' : 'opacity-70'}`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='h-5 w-5'
            aria-hidden='true'
          >
            <path d='M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4' />
            <polyline points='10 17 15 12 10 7' />
            <line x1='15' x2='3' y1='12' y2='12' />
          </svg>
        </NavLink>
      )}

      <button
        type='button'
        aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        onClick={toggleTheme}
        className={`${linkStyles} inline-flex p-1`}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='h-5 w-5'
          aria-hidden='true'
        >
          {theme === 'dark' ? (
            <>
              <circle cx='12' cy='12' r='4' />
              <path d='M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41' />
            </>
          ) : (
            <path d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z' />
          )}
        </svg>
      </button>
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
          className='flex flex-wrap items-center gap-4 border-t border-neutral-200 px-4 py-4 sm:hidden'
        >
          {navLinks}
        </nav>
      )}
    </header>
  )
}

export default Header
