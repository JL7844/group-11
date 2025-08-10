import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import { ClientDashboard } from './routes/ClientDashboard';
import { AttorneyDashboard } from './routes/AttorneyDashboard';
import { Login } from './routes/Login';
import { Search } from './routes/Search';
import { Profile } from './routes/Profile';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/search" replace /> },
      { path: 'login', element: <Login /> },
      { path: 'search', element: <Search /> },
      { path: 'lawyers/:id', element: <Profile /> },
      { path: 'client', element: <ClientDashboard /> },
      { path: 'attorney', element: <AttorneyDashboard /> },
    ],
  },
]);