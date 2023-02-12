import React, { useState, useEffect } from "react";

import { Navigate } from "react-router-dom";
import TopNav from "../../components/Navigation/TopNav";
import "./home.css";

interface HomeProps {
  isAuthorized: string | null;
}

function Home({ isAuthorized }: HomeProps) {
  useEffect(() => {
    if (isAuthorized === null) {
      <Navigate to="/login" />;
    }
  }, []);

  return (
    <div className="container">
      <div className="header">
        <TopNav isAuthorized={isAuthorized} />
      </div>
    </div>
  );
}

export default Home;
