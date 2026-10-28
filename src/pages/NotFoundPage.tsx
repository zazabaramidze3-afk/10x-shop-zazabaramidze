import { Link } from 'react-router-dom'


const NotFoundPage = () => {
  return (
    <div>
        <h1 className="text-2xl font-semibold">404 - Page not found</h1>
        <Link to="/">Back to catalog</Link>
    </div>
  )
}

export default NotFoundPage
