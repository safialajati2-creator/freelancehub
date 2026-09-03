import { Navigate } from 'react-router-dom';
import { readJson } from '../utils/storage';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  const currentUser = readJson('currentUser', null);
  if (!token || !currentUser) return <Navigate to="/login" replace />;
  return children;
}

export default ProtectedRoute;