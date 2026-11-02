import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import BaseLayout from './layouts/BaseLayout'
import ProtectedRoute from './components/ProtectedRoute'

// Route-level code splitting: გვერდის კოდი იტვირთება მხოლოდ მაშინ, როცა მომხმარებელი მასზე გადადის
const CatalogPage = lazy(() => import('./pages/CatalogPage'))
const ProductPage = lazy(() => import('./pages/ProductPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const CartPage = lazy(() => import('./pages/CartPage'))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'))
const OrderConfirmationPage = lazy(() => import('./pages/OrderConfirmationPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function App() {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route path='/products/:id' element={<ProductPage />} />
        <Route path='/' element={<CatalogPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/order-confirmation' element={<OrderConfirmationPage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
