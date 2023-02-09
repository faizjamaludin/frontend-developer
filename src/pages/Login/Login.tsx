import React from "react";
import "../form.css";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";

function Login() {
  return (
    <div className="login-box">
      <p>Login</p>
      <form>
        <div className="user-box">
          <input required name="" type="text" />
          <label>Mobile</label>
        </div>
        <div className="user-box">
          <input required name="" type="password" />
          <label>Password</label>
        </div>
        <Button />
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
