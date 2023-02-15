import React, { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import styles from "./register.module.css";
import Loader from "../../components/Loader/Loader";

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

  // declare error from extensions validation to object
  const obj = Object.values(
    (error?.graphQLErrors[0]?.extensions?.validation ?? {}) as Record<
      string,
      unknown
    >
  );

  useEffect(() => {
    if (data) {
      setIsSubmitting(false);

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 3000);
    }
  }, [data, error]);

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

    if (formData.password.length < 8) {
      passwordError = "The password must be at least 8 characters";
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

      // execute register mutation
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
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div>
          <h1 className={styles.textBrand_h1}>Front End</h1>
          <h1 className={`${styles.textBrand_h1} ${styles.textBrand_h1_2}`}>
            Developer
          </h1>
        </div>

        <div>
          <p className={styles.textTagline_p}>Where all the journey begins</p>
        </div>

        <div className={styles.mainImage}>
          <img className={styles.mainImage_img} src="img/peeps1.png" alt="" />
          <img className={styles.mainImage_img} src="img/peeps2.png" alt="" />
        </div>
      </div>
      {/* box right side */}
      <div className={styles.registerContainer}>
        <div className={styles.registerBox}>
          {data && (
            <div className={styles.successMsg}>
              <i className="fa fa-check"></i> {data.register}
            </div>
          )}

          <div className={styles.registerForm}>
            <form onSubmit={handleSubmit}>
              <div className={styles.formHeader}>
                <h1 className={styles.formHeader_h1}>Register</h1>

                {/* if error occur, display error value from api */}
                {error &&
                  (obj as [string, unknown][]).map(([key, value]) => (
                    <p className={styles.errMsg} key={key}>
                      {key}: {JSON.stringify(value)}
                    </p>
                  ))}
              </div>
              <div className={styles.formInput}>
                <label className={styles.formInput_label} htmlFor="name">
                  Full Name
                </label>
                <input
                  className={styles.formInput_input}
                  type="text"
                  id="full_name"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {formErrors.fullNameError && (
                  <p className={styles.errMsg}>{formErrors.fullNameError}</p>
                )}
              </div>
              <div className={styles.formInput}>
                <label className={styles.formInput_label} htmlFor="name">
                  Email
                </label>
                <input
                  className={styles.formInput_input}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="johndoe@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {formErrors.emailError && (
                  <p className={styles.errMsg}>{formErrors.emailError}</p>
                )}
              </div>
              <div className={styles.formInput}>
                <label className={styles.formInput_label} htmlFor="name">
                  Mobile
                </label>
                <input
                  className={styles.formInput_input}
                  type="text"
                  id="mobile"
                  name="mobile"
                  placeholder="60134567890"
                  value={formData.mobile}
                  onChange={handleChange}
                />
                {formErrors.mobileError && (
                  <p className={styles.errMsg}>{formErrors.mobileError}</p>
                )}
              </div>
              <div className={styles.formInput}>
                <label className={styles.formInput_label} htmlFor="name">
                  Password
                </label>
                <input
                  className={styles.formInput_input}
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {formErrors.passwordError && (
                  <p className={styles.errMsg}>{formErrors.passwordError}</p>
                )}
              </div>
              <div className={styles.formInput}>
                <label className={styles.formInput_label} htmlFor="name">
                  Confirm Password
                </label>
                <input
                  className={styles.formInput_input}
                  type="password"
                  id="cpassword"
                  name="cPassword"
                  value={formData.cPassword}
                  onChange={handleChange}
                />
                {formErrors.cPasswordError && (
                  <p className={styles.errMsg}>{formErrors.cPasswordError}</p>
                )}
              </div>
              {loading ? (
                <div className={styles.loaderContainer}>
                  <Loader />
                </div>
              ) : (
                <div className={styles.formBtn}>
                  <Button btnType="submit" text="Sign up" />
                  <p className={styles.formBtn_p}>
                    Have an account ?{" "}
                    <a className={styles.formBtn_a} href="/login">
                      Sign in
                    </a>
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
