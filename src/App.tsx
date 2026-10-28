import { Route, Routes } from 'react-router-dom'
import CatalogPage from './pages/CatalogPage'
import NotFoundPage from './pages/NotFoundPage'


function App() {
  return (
    <Routes>
      <Route path="/" element={<CatalogPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App