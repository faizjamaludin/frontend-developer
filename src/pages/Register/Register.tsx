import React from "react";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import "../form.css";

function Register() {
  return (
    <div className="login-box">
      <p>Register</p>
      <form>
        <div className="user-box">
          <input required name="" type="text" />
          <label>Full Name</label>
        </div>
        <div className="user-box">
          <input required name="" type="text" />
          <label>Email</label>
        </div>
        <div className="user-box">
          <input required name="" type="text" />
          <label>Mobile</label>
        </div>
        <div className="user-box">
          <input required name="" type="password" />
          <label>Password</label>
        </div>
        <div className="user-box">
          <input required name="" type="password" />
          <label>Confirm Password</label>
        </div>
        <Button />
      </form>
    </div>
  );
}

export default Register;
