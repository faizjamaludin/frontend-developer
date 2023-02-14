import React from "react";
import styles from "./notfound.module.css";

function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.errTitle_h1}>
        <h1>404 | PAGE NOT FOUND</h1>
      </div>
    </div>
  );
}

export default NotFound;
