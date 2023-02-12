import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Button from "./components/Button/Button";
import Logout from "./pages/Logout/Logout";
import NotFound from "./pages/NotFound/NotFound";
import ProtectedRoute from "./Route/ProtectedRoute";

interface AuthProp {
  token: string | null;
}

function App() {
  const token = localStorage.getItem("token");
  console.log(token);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home isAuthorized={token} />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
