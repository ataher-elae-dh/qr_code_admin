import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    // Show loading while checking auth
    return <p>Loading...</p>;
  }

  if (!user) {
    // If not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  // If logged in, show the protected page
  return children;
}
// PrivateRoute.jsx