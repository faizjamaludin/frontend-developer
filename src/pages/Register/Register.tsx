import React, { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import "../form.css";

import { useRegisterMutation } from "../../hooks/useMutation";

// set the interface type for the input
interface FormData {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  cPassword: string;
}

// set the interface type for form error
interface FormError {
  fullNameError: string;
  emailError: string;
  mobileError: string;
  passwordError: string;
  cPasswordError: string;
}

// set the initial value for formdata
const initialFormData: FormData = {
  fullName: "",
  email: "",
  mobile: "",
  password: "",
  cPassword: "",
};

function Register() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<FormError>({
    fullNameError: "",
    emailError: "",
    mobileError: "",
    passwordError: "",
    cPasswordError: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const { register, data, loading, error } = useRegisterMutation();

  useEffect(() => {
    if (data) {
      setIsSubmitting(false);
      console.log(data, loading, error?.message);
      navigate("/login", { replace: true });
    }
  }, [data]);

  // everytime user onChange in input, the value will capture and store in formData
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // this to make sure form is validate based on requirement
  const validate = () => {
    let fullNameError = "";
    let emailError = "";
    let mobileError = "";
    let passwordError = "";
    let cPasswordError = "";

    if (!formData.fullName) {
      fullNameError = "Full name is required";
    }

    if (!formData.email) {
      emailError = "Email is required";
    }

    if (!formData.mobile) {
      mobileError = "Mobile is required";
    }

    if (!formData.password) {
      passwordError = "Please insert the password";
    }

    if (formData.cPassword == "") {
      cPasswordError = "Please insert the confirmation password";
    }

    if (formData.password !== formData.cPassword) {
      passwordError = "Password does not match";
      cPasswordError = "Password does not match";
    }

    if (mobileError || passwordError) {
      setFormErrors({
        fullNameError,
        emailError,
        mobileError,
        passwordError,
        cPasswordError,
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validate();

    if (isValid) {
      setIsSubmitting(true);
      register({
        variables: {
          fullName: formData.mobile,
          email: formData.email,
          mobile: formData.mobile,
          password: formData.password,
        },
      });
    }
  };

  return (
    <div className="wrapper">
      <div className="login-box">
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <div className="form-header">
              <div className="form-header">
                <h1>Register</h1>
                {error && <p className="err-msg">{error.message}</p>}
              </div>
            </div>
            <div className="form-input">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="full_name"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
              />
              {formErrors.fullNameError && (
                <p className="err-msg">{formErrors.fullNameError}</p>
              )}
            </div>
            <div className="form-input">
              <label htmlFor="name">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="johndoe@gmail.com"
                value={formData.email}
                onChange={handleChange}
              />
              {formErrors.emailError && (
                <p className="err-msg">{formErrors.emailError}</p>
              )}
            </div>
            <div className="form-input">
              <label htmlFor="name">Mobile</label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                placeholder="60134567890"
                value={formData.mobile}
                onChange={handleChange}
              />
              {formErrors.mobileError && (
                <p className="err-msg">{formErrors.mobileError}</p>
              )}
            </div>
            <div className="form-input">
              <label htmlFor="name">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {formErrors.passwordError && (
                <p className="err-msg">{formErrors.passwordError}</p>
              )}
            </div>
            <div className="form-input">
              <label htmlFor="name">Confirm Password</label>
              <input
                type="password"
                id="cpassword"
                name="cPassword"
                value={formData.cPassword}
                onChange={handleChange}
              />
              {formErrors.cPasswordError && (
                <p className="err-msg">{formErrors.cPasswordError}</p>
              )}
            </div>
            <div className="form-btn">
              <Button btnType="submit" text="Sign up" />
              <p>
                Have an account ? <a href="/login">Sign in</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
