import { Navigate } from "react-router-dom";
import { getAuth } from "../../utils/auth";

export default function ProtectedRoute({ children, role }) {
  const { token, user } = getAuth();
  if (!token) return <Navigate to="/login" />;
  if (role && user?.role !== role) return <Navigate to="/" />;
  return children;
}