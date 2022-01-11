import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  const isAutheticated = !!currentUser;
  return isAutheticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
