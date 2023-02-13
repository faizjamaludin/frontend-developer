import React, { useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import "./topnav.css";
import { gql, useMutation } from "@apollo/client";

import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";

interface AuthProp {
  isAuthorized: string | null;
}

const LOGOUT_MUTATION = gql`
  mutation {
    logout {
      status
      message
    }
  }
`;

function TopNav({ isAuthorized }: AuthProp) {
  const navigate = useNavigate();

  const [logoutMutation, { data, loading, error }] = useMutation(LOGOUT_MUTATION, {
    context: {
      headers: {
        Authorization: `Bearer ${isAuthorized}`,
      },
    },
  });

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await logoutMutation();
  };

  useEffect(() => {

    if (data) {
      console.log(data, loading, error);
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
    }

  }, [data])




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
        {loading ? <Loader /> : <Button onclick={handleLogout} text="Logout" />}
      </div>
    </nav>
  );
}

export default TopNav;
