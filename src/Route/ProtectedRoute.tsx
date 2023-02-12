import React from "react";
import { Outlet, Navigate } from "react-router-dom";

interface AuthProp {
  isAuthorized: string | null;
}

const ProtectedRoute = ({ isAuthorized }: AuthProp) => {
  return isAuthorized ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
