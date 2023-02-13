import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./topnav.css";
import { gql, useMutation } from "@apollo/client";

import { Link } from "react-router-dom";
import Button from "../Button/Button";

const LOGOUT_MUTATION = gql`
  mutation {
    logout {
      status
      message
    }
  }
`;

function TopNav() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [logoutMutation, { data, error }] = useMutation(LOGOUT_MUTATION, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  useEffect(() => {
    if (data && data.logout) {
      console.log(data);
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
    }
  }, [data]);

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    logoutMutation();

    if (data) {
      console.log(data);
    }
  };

  return (
    <nav className="navbar">
      <h3 className="logo">Logo</h3>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/">Cart</Link>
        </li>
      </ul>

      <div className="">
        <Button onclick={handleLogout} text="Logout" />
      </div>
    </nav>
  );
}

export default TopNav;
