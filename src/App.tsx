import { Route, Routes } from 'react-router-dom'
import CatalogPage from './pages/CatalogPage'
import NotFoundPage from './pages/NotFoundPage'
import BaseLayout from './layouts/BaseLayout'


function App() {
  return (
    <Routes>
      <Route element={ <BaseLayout/> }>
        <Route path="/" element={<CatalogPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App