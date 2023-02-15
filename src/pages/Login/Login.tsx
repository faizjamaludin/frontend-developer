import React, { useState, useEffect } from "react";
import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";

import { useLoginMutation } from "../../hooks/useMutation";

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

function Login() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<FormError>({
    mobileError: "",
    passwordError: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  //start sending mutation
  const { login, data, loading, error } = useLoginMutation();
  const obj = Object.values(
    (error?.graphQLErrors[0]?.extensions?.validation ?? {}) as Record<
      string,
      unknown
    >
  );


  console.log(error?.graphQLErrors[0]?.extensions?.validation);

  //useEffec hook to make sure login() is executed and data is exist then can proceed to store token
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (data && data.login) {
      localStorage.setItem("token", data.login.token);
      setIsSubmitting(false);
      // console.log(data, loading, error?.message);
    }

    if (token) {
      navigate("/", { replace: true, state: { isAuthorized: token } });
    }
  }, [data, token, error]);

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
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <div className={styles.loginForm}>
            <form onSubmit={handleSubmit}>
              <div className={styles.formHeader}>
                <h1 className={styles.formHeader_h1}>Login</h1>
                {/* {error && } */}
                {obj.length > 1
                  ? (obj as [string, unknown][]).map(([key, value]) => (
                    <p className={styles.errMsg} key={key}>
                      {key}: {JSON.stringify(value)}
                    </p>
                  ))
                  : <p className={styles.errMsg}>{error?.message}</p>}
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
              {loading ? (
                <div className={styles.loaderContainer}>
                  <Loader />
                </div>
              ) : (
                <div className={styles.formBtn}>
                  <Button text="Sign In" />
                  <p className={styles.formBtn_p}>
                    Don't have an account ?{" "}
                    <a className={styles.formBtn_a} href="/register">
                      Sign up!
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

export default Login;
