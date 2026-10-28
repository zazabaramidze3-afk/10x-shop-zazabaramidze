import { Outlet } from 'react-router-dom'

const BaseLayout = () => {
  return (
    <div className='min-h-screen bg-white text-neutral-900'>
        <header className='border-b border-neutral-200'>
            <div className='mx-auto flex h-16 max-w-6xl items-center px-4'>
                <span className='text-lg font-semibold'>10X Shop</span>
            </div>
        </header>
        <main className='mx-auto max-w-6xl px-4 py-8'>
            <Outlet />        
        </main>        
    </div>
  )
}

export default BaseLayout