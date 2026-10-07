import { Navigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

export default function RootRedirect() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return isAuthenticated ? (
    <Navigate to="/chats" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}
