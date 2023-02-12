import React from "react";
// import { Outlet } from "react-router-dom";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";

interface AuthProp {
  isAuthorized: string | null;
}

interface Props {
  component: React.FC;
  path: string;
  exact?: boolean;
}

function ProtectedRoute() {
  const token = localStorage.getItem("token");

  return <>{token !== null ? <Home isAuthorized={token} /> : <Login />}</>;
}

export default ProtectedRoute;
