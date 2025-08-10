import { Outlet } from 'react-router-dom'
import './App.css'
import { NavBar } from './components/NavBar'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t text-center text-xs text-gray-600 py-4">© {new Date().getFullYear()} LexFind</footer>
    </div>
  )
}

export default App
