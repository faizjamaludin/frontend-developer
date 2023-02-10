import React, { useState } from "react";
import "../form.css";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import { gql, useMutation } from "@apollo/client";
import Loader from "../../components/Loader/Loader";

const LOGIN_MUTATION = gql`
mutation Login($userMobile: String!, $password: String!) {
  login(input: { user_mobile: $userMobile, password: $password }) {
    token
    user {
      user_id
    }
  }
}
`;

function Login() {
  const [userMobile, setUserMobile] = useState("");
  const [password, setPassword] = useState("");

  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION, {
    variables: { userMobile, password },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login();

  };

  if (data) {
    localStorage.setItem('token', data.login.token)
  }
  console.log(loading);


  return (
    <div className="login-box">
      <p>Login</p>
      <form onSubmit={handleSubmit}>
        <div className="user-box">
          <input
            required
            name="mobile"
            type="text"
            value={userMobile}
            onChange={(e) => setUserMobile(e.target.value)}
          />
          <label>Mobile</label>
        </div>
        <div className="user-box">
          <input
            required
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Password</label>
        </div>
        <Button text="Sign In" />
      </form>
      <p className="sign-up">
        Don't have an account?{" "}
        <Link className="a2" to="/register">
          Sign up!
        </Link>
      </p>
    </div>
  );
}

export default Login;