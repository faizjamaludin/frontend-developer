import React from "react";
import styles from "./footer.module.css";

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.footerBox}>
        <span className={styles.footerRights}>
          © 2023 Faiz Jamaludin. All rights reserved.
        </span>
      </div>
    </div>
  );
}

export default Footer;
