import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import LawyerProfilePage from './pages/LawyerProfilePage'
import DashboardPage from './pages/DashboardPage'
import MessagesPage from './pages/MessagesPage'
import ResourcesPage from './pages/ResourcesPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/lawyers/:id' element={<LawyerProfilePage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/messages' element={<MessagesPage />} />
        <Route path='/resources' element={<ResourcesPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
