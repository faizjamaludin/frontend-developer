import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./topnav.module.css";
import { gql, useMutation } from "@apollo/client";

import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

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
  const location = useLocation();
  const path = location.pathname;

  const [mobile, setMobile] = useState(false);

  const [logoutMutation, { data, loading, error }] = useMutation(
    LOGOUT_MUTATION,
    {
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }
  );

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
    <nav className={styles.navbar}>
      <h3 className={styles.logo}>
        <Link className={styles.navLinks_logo} to="/">
          Logo
        </Link>
      </h3>

      <ul className={mobile ? styles.mobileMenu : styles.navLinks}>
        <li className={styles.navLinks_li}>
          <Link
            className={
              path == "/" ? styles.navLinks_li_a_active : styles.navLinks_li_a
            }
            to="/"
          >
            Home
          </Link>
        </li>
        <li className={styles.navLinks_li}>
          <Link className={styles.navLinks_li_a} to="/">
            Projects
          </Link>
        </li>
        <li className={styles.navLinks_li}>
          <Link className={styles.navLinks_li_a} to="/">
            Tasks
          </Link>
        </li>
        <li className={styles.navLinks_li}>
          <Link className={styles.navLinks_li_a} to="/">
            Reporting
          </Link>
        </li>
        <li className={styles.navLinks_li}>
          <Button onclick={handleLogout} text="Logout" />
        </li>
      </ul>

      {/* <div className={styles.logOutBtn}></div> */}

      <button onClick={() => setMobile(!mobile)} className={styles.mobileMenu}>
        {mobile ? <RxCross2 className={styles.icon} /> : <GiHamburgerMenu />}
      </button>
    </nav>
  );
}

export default TopNav;
