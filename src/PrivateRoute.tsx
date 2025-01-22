import { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from "./AuthProvider";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
