import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import ScrollToTop from '../components/ScrollToTop'

const BaseLayout = () => {
  return (
    <div className='flex min-h-screen flex-col bg-white text-neutral-900'>
      <ScrollToTop />
      <Header />
      <main className='mx-auto w-full max-w-6xl flex-1 px-4 py-8'>
        <Suspense fallback={<p>Loading...</p>}>
          <Outlet />
        </Suspense>
      </main>
      <footer className='border-t border-neutral-200 py-6 text-center text-sm text-neutral-600'>
        © 2026 10X Shop
      </footer>
    </div>
  )
}

export default BaseLayout
