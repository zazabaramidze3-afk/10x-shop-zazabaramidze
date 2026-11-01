import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className='space-y-4'>
        <h1 className='text-2xl font-semibold'>Page not found</h1>
        <p className='text-neutral-600'>The page you are looking for does not exist.</p>
        <Link to='/' className='inline-block text-sm font-medium underline transition duration-200 hover:opacity-70'>
            Go to catalog
        </Link>
    </div>
  )
}

export default NotFoundPage
