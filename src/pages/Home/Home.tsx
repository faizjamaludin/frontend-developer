import React, { useState, useEffect } from "react";

import { Navigate } from "react-router-dom";
import TopNav from "../../components/Navigation/TopNav";
import styles from "./home.module.css";

interface HomeProps {
  isAuthorized: string | null;
}

function Home({ isAuthorized }: HomeProps) {
  // if (isAuthorized === null) {
  //   <Navigate to="/login" />;
  // }

  return (
    <div className="container">
      <div className="header">
        <TopNav />
      </div>
    </div>
  );
}

export default Home;
