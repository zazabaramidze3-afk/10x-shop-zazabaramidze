import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Button from './Button'
import useAuth from '../hooks/useAuth'
import useCart from '../hooks/useCart'
import useTheme from '../hooks/useTheme'
import { getCartCount } from '../utils/cart'

const linkStyles =
  'whitespace-nowrap text-sm font-medium transition duration-200 hover:opacity-70 focus-ring'

// NavLink-ს className-ში isActive გადმოეცემა: მიმდინარე გვერდის ბმული გამოიკვეთება
const rowStyles = 'w-full gap-3 rounded-lg px-2 py-2.5 text-base hover:bg-neutral-100'

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

  // Escape ღილაკით მენიუს დახურვა
  useEffect(() => {
    if (!isMenuOpen) return
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  const handleLogout = (): void => {
    logout()
    closeMenu()
  }

  // ერთი და იგივე ბმულები ორ ადგილას გამოიყენება: კომპიუტერის ზოლში და მობილურის მენიუში
  const renderNavLinks = (showLabels: boolean) => (
    <>
      <NavLink
        to='/'
        end
        onClick={closeMenu}
        className={(state) => `${getNavLinkStyles(state)} ${showLabels ? `block ${rowStyles}` : ''}`}
      >
        Catalog
      </NavLink>

      <NavLink
        to='/cart'
        onClick={closeMenu}
        aria-label={`Cart, ${cartCount} items`}
        className={({ isActive }) => `${linkStyles} relative inline-flex items-center p-1 ${showLabels ? rowStyles : ''} ${isActive ? 'opacity-100' : 'opacity-70'}`}
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
          <path d='M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z' />
          <path d='M3 6h18' />
          <path d='M16 10a4 4 0 0 1-8 0' />
        </svg>
        {showLabels && <span>Cart</span>}
        {cartCount > 0 && (
          <span className={`${showLabels ? 'ml-auto' : 'absolute -right-2 -top-1'} flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-xs font-medium text-white`}>
            {cartCount}
          </span>
        )}
      </NavLink>

      {user.isLoggedIn ? (
        <>
          <span className={`truncate text-sm text-neutral-600 ${showLabels ? 'w-full px-2 pt-2' : 'max-w-40'}`}>{user.username}</span>
          <button
            type='button'
            aria-label='Logout'
            title='Logout'
            onClick={handleLogout}
            className={`${linkStyles} inline-flex items-center p-1 ${showLabels ? rowStyles : ''}`}
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
            {showLabels && <span>Logout</span>}
          </button>
        </>
      ) : (
        <NavLink
          to='/login'
          onClick={closeMenu}
          aria-label='Login'
          title='Login'
          className={({ isActive }) => `${linkStyles} inline-flex items-center p-1 ${showLabels ? rowStyles : ''} ${isActive ? 'opacity-100' : 'opacity-70'}`}
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
          {showLabels && <span>Login</span>}
        </NavLink>
      )}

      <button
        type='button'
        aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        onClick={toggleTheme}
        className={`${linkStyles} inline-flex items-center p-1 ${showLabels ? rowStyles : ''}`}
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
        {showLabels && <span>{theme === 'dark' ? 'Light theme' : 'Dark theme'}</span>}
      </button>
    </>
  )

  return (
    <header className='border-b border-neutral-200'>
      <div className='mx-auto flex h-16 max-w-6xl items-center justify-between px-4'>
        <Link
          to='/'
          onClick={closeMenu}
          className='flex items-center gap-2 whitespace-nowrap text-lg font-semibold transition duration-200 hover:opacity-70 focus-ring'
        >
          <span>10X</span>
          <svg
            aria-hidden='true'
            viewBox='0 0 32 32'
            fill='none'
            stroke='currentColor'
            strokeWidth='2.2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='h-7 w-7'
          >
            <path d='M2 5h4l3 14h14l3-10H8' />
            <path d='M12 9l2-4h4l1 4' />
            <path d='M16 9v4' />
            <circle cx='11' cy='25' r='2' />
            <circle cx='21' cy='25' r='2' />
          </svg>
          <span className='sr-only'>Shop</span>
        </Link>

        {/* კომპიუტერი: 640px-დან ზემოთ ბმულები ერთ ხაზზეა */}
        <nav aria-label='Main' className='hidden items-center gap-4 sm:flex'>
          {renderNavLinks(false)}
        </nav>

        {/* მობილური: 640px-ზე ქვემოთ მხოლოდ ბურგერ ღილაკი */}
        <Button
          variant='secondary'
          className='sm:hidden'
          aria-label='Open menu'
          aria-expanded={isMenuOpen}
          aria-controls='mobile-menu'
          onClick={() => setIsMenuOpen(true)}
        >
          ☰
        </Button>
      </div>

      {/* მობილური: გვერდიდან შემოსული მენიუ (drawer) */}
      <div
        className={`fixed inset-0 z-50 sm:hidden ${isMenuOpen ? '' : 'pointer-events-none'}`}
      >
        <div
          onClick={closeMenu}
          aria-hidden='true'
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <nav
          id='mobile-menu'
          aria-label='Mobile'
          aria-hidden={!isMenuOpen}
          className={`absolute right-0 top-0 flex h-full w-64 max-w-[80%] flex-col gap-4 border-l border-neutral-200 bg-white p-6 shadow-xl transition-[transform,visibility] duration-300 ease-out ${
            isMenuOpen ? 'translate-x-0' : 'invisible translate-x-full'
          }`}
        >
          <Button variant='secondary' className='self-end' aria-label='Close menu' onClick={closeMenu}>
            ✕
          </Button>
          <div className='flex flex-col gap-1'>{renderNavLinks(true)}</div>
        </nav>
      </div>
    </header>
  )
}

export default Header
