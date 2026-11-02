import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Button from './Button'
import useAuth from '../hooks/useAuth'
import useCart from '../hooks/useCart'
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
          <span className='text-sm text-neutral-600'>{user.username}</span>
          <Button variant='secondary' onClick={handleLogout}>
            Logout
          </Button>
        </>
      ) : (
        <NavLink to='/login' onClick={closeMenu} className={getNavLinkStyles}>
          Login
        </NavLink>
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
