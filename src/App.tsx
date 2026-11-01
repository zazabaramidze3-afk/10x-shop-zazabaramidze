import { Route, Routes } from 'react-router-dom'
import CatalogPage from './pages/CatalogPage'
import NotFoundPage from './pages/NotFoundPage'
import BaseLayout from './layouts/BaseLayout'
import LoginPage from './pages/LoginPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import ProtectedRoute from './components/ProtectedRoute'
import CheckoutPage from './pages/CheckoutPage'
import OrderConfirmationPage from './pages/OrderConfirmationPage'


function App() {
  return (
    <Routes>
      <Route element={ <BaseLayout/> }>
        <Route path='/products/:id' element={<ProductPage />} />
        <Route path="/" element={<CatalogPage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/cart" element={<CartPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App