import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../store';

export function NavBar() {
  const { role, name, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    if (location.pathname.startsWith('/client') || location.pathname.startsWith('/attorney')) {
      navigate('/search');
    }
  }

  return (
    <header className="border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to="/search" className="font-bold">LexFind</Link>
        <nav className="flex items-center gap-4">
          <Link className="hover:underline" to="/search">Search</Link>
          <Link className="hover:underline" to="/resources">Resources</Link>
          <Link className="hover:underline text-red-600" to="/emergency">Emergency</Link>
          {!role && <Link className="hover:underline" to="/login">Sign in</Link>}
          {role === 'client' && <Link className="hover:underline" to="/client">Client</Link>}
          {role === 'attorney' && <Link className="hover:underline" to="/attorney">Attorney</Link>}
          {role && (
            <button className="text-sm text-red-600" onClick={handleLogout}>
              Logout{ name ? ` (${name})` : '' }
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}