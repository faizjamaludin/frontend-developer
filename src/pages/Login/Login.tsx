import React, { useState, useEffect } from "react";
import "../form.css";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { gql, useMutation } from "@apollo/client";
import Loader from "../../components/Loader/Loader";

// set the interface type for the input
interface FormData {
  mobile: string;
  password: string;
}

// set the interface type for form error
interface FormError {
  mobileError: string;
  passwordError: string;
}

// set the initial value for formdata
const initialFormData: FormData = {
  mobile: "",
  password: "",
};

// mutation query
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
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<FormError>({
    mobileError: "",
    passwordError: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  //start sending mutation
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  //useEffec hook to make sure login() is executed and data is exist then can proceed to store token
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (data && data.login) {
      localStorage.setItem("token", data.login.token);
      setIsSubmitting(false);
      console.log(data, loading, error?.message);
      console.log(token);
    }

    if (token) {
      navigate("/", { replace: true, state: { isAuthorized: token } });
    }
  }, [data, token]);

  // everytime user onChange in input, the value will capture
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

    setFormErrors({
      ...formErrors,
      mobileError: "",
      passwordError: "",
    });
  };

  // this to make sure form is validate based on requirement
  const validate = () => {
    let mobileError = "";
    let passwordError = "";

    if (!formData.mobile) {
      mobileError = "Mobile is required";
    }

    if (formData.password == "") {
      passwordError = "Please insert the password";
    }

    if (mobileError || passwordError) {
      setFormErrors({ mobileError, passwordError });
      return false;
    }

    return true;
  };

  // handle submit and use login variable to store data and send to mutation
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validate();

    if (isValid) {
      setIsSubmitting(true);
      login({
        variables: {
          userMobile: formData.mobile,
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
              <h1>Login</h1>
              {error && <p className="err-msg">{error.message}</p>}
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
            {loading ? (
              <div className="loader-container">
                <Loader />
              </div>
            ) : (
              <div className="form-btn">
                <Button text="Sign In" />
                <p>
                  Don't have an account ? <a href="/register">Sign up!</a>
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
