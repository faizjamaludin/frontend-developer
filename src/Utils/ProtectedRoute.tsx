import React from "react";
import { Outlet, Navigate } from "react-router-dom";


const ProtectedRoute = () => {
  const isAuthorized = localStorage.getItem('token')

  return isAuthorized !== null ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
