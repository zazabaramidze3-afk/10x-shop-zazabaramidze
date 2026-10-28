import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='border-b border-neutral-200'>
        <div className='mx-auto flex h-16 max-w-6xl items-center px-4'>
            <Link
                to='/'
                className='text-lg
                font-semibold
                transition duration-200
                hover:opacity-70 
                focus-visible:outline-2 
                focus-visible:outline-offset-4
                focus-visible:outline-neutral-900'   
            >
                10X Shop
            </Link>
        </div>
    </header>
  )
}

export default Header