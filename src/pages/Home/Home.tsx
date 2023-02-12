import React, { useState, useEffect } from "react";

import { redirect } from "react-router-dom";
import TopNav from "../../components/Navigation/TopNav";
import "./home.css";

interface HomeProps {
  isAuthorized: string | null;
}

function Home({ isAuthorized }: HomeProps) {
  const [logout, setLogout] = useState("");
  const logoutToken = localStorage.getItem("token");
  // const navigate = useNavigate();

  useEffect(() => {
    if (isAuthorized === null) {
      redirect("/login");
    }
  }, [isAuthorized]);

  return (
    <div className="container">
      <div className="header">
        <TopNav isAuthorized={isAuthorized} />
      </div>
    </div>
  );
}

export default Home;
