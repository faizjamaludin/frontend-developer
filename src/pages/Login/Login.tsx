import React, { useState } from "react";
import "../form.css";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import { gql, useMutation } from "@apollo/client";

type AuthUser = {
  mobile: string;
  password: string;
};

const LOGIN_MUTATION = gql`
mutation {
  login( 
    input:{
      user_mobile:"60134549584",
      password:"faiz.jamaludin"
    }
  )
{
  token
  user {
    user_id
    }
  }
}
`


function Login() {

  return (
    <div className="login-box">
      <p>Login</p>
      <form>
        <div className="user-box">
          <input required name="mobile" type="text" />
          <label>Mobile</label>
        </div>
        <div className="user-box">
          <input required name="password" type="password" />
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
