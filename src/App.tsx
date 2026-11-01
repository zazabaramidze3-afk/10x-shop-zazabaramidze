import { Route, Routes } from 'react-router-dom'
import CatalogPage from './pages/CatalogPage'
import NotFoundPage from './pages/NotFoundPage'
import BaseLayout from './layouts/BaseLayout'
import LoginPage from './pages/LoginPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import ProtectedRoute from './components/ProtectedRoute'
import CheckoutPage from './pages/CheckoutPage'


function App() {
  return (
    <Routes>
      <Route element={ <BaseLayout/> }>
        <Route path='/products/:id' element={<ProductPage />} />
        <Route path="/" element={<CatalogPage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App