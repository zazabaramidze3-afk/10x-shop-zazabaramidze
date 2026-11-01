import { Route, Routes } from 'react-router-dom'
import CatalogPage from './pages/CatalogPage'
import NotFoundPage from './pages/NotFoundPage'
import BaseLayout from './layouts/BaseLayout'
import LoginPage from './pages/LoginPage'
import ProductPage from './pages/ProductPage'


function App() {
  return (
    <Routes>
      <Route element={ <BaseLayout/> }>
        <Route path='/products/:id' element={<ProductPage />} />
        <Route path="/" element={<CatalogPage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App