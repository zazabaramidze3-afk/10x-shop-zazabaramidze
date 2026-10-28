import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const BaseLayout = () => {
  return (
    <div className='min-h-screen bg-white text-neutral-900'>
        <Header />
        <main className='mx-auto max-w-6xl px-4 py-8'>
            <Outlet />        
        </main>        
    </div>
  )
}

export default BaseLayout