import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, requireAdmin }) {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if ((user && !requireAdmin) || (requireAdmin && user?.isAdmin)) {
    return children;
  }

  return <Navigate to="/" replace />;
}
