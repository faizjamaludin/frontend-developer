import React, { useState, useEffect } from "react";

import { Navigate } from "react-router-dom";
import TopNav from "../../components/Navigation/TopNav";
import Navbar from "../../components/Navigation/Navbar";
import styles from "./home.module.css";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Navbar
          links={[
            { name: 'Home', path: '/' },
            { name: 'Projects', path: '/project' },
            { name: 'Tasks', path: '/task' },
          ]}
        />
      </div>
      {/* Welcome section */}
      <section className={styles.welcomeContainer}>
        <div className={styles.welcomeBox}>
          <div className={styles.welcomeImg}>
            <img className={styles.welcomeImg_img} src="/img/mail.png" alt="" />
          </div>
          <div className={styles.welcomeText}>
            <h2 className={styles.text_h2}>
              Welcome to Front End Developer ! Let's get started
            </h2>
            <p className={styles.welcomeText_p}>
              Get started building your personal projects, testing out ideas,
              and more in your workspace.
            </p>
            <div className={styles.btnBox}>
              <Button text="Create project" />
              <Button text="Import project" />
            </div>
            <p className={styles.welcomeText_p}>
              Plan to collaborate with your team? Create a new workspace to get
              started.
            </p>
            <div className={styles.btnBox}>
              <Button text="Create workspace" />
            </div>
          </div>
        </div>
      </section>

      {/* Recent project */}
      <section className={styles.projectContainer}>
        <h2 className={styles.text_h2}>Recent project</h2>
        <div className={styles.projectBox}>
          {/* Project 1 */}
          <div className={styles.recentProject}>
            <img
              className={styles.recentProject_img}
              src="/img/no-image.png"
              alt=""
            />
            <div className="projectDetail">
              <h4 className={styles.text_h4}>Webby Assessment</h4>
              <p className={styles.recentProject_p}>
                Create front end developer website
              </p>
              <span className={styles.recentProject_created}>
                created: 10-02-2023
              </span>
            </div>
          </div>

          {/* Project 2 */}
          <div className={styles.recentProject}>
            <img
              className={styles.recentProject_img}
              src="/img/good-job.png"
              alt=""
            />
            <div className="projectDetail">
              <h4 className={styles.text_h4}>Webby Assessment</h4>
              <p className={styles.recentProject_p}>
                Create front end developer website
              </p>
              <span className={styles.recentProject_created}>
                created: 10-02-2023
              </span>
            </div>
          </div>

          {/* Project 3 */}
          <div className={styles.recentProject}>
            <img
              className={styles.recentProject_img}
              src="/img/hi.png"
              alt=""
            />
            <div className="projectDetail">
              <h4 className={styles.text_h4}>Webby Assessment</h4>
              <p className={styles.recentProject_p}>
                Create front end developer website
              </p>
              <span className={styles.recentProject_created}>
                created: 10-02-2023
              </span>
            </div>
          </div>

          {/* Project 4 */}
          <div className={styles.recentProject}>
            <img
              className={styles.recentProject_img}
              src="/img/broken.png"
              alt=""
            />
            <div className="projectDetail">
              <h4 className={styles.text_h4}>Webby Assessment</h4>
              <p className={styles.recentProject_p}>
                Create front end developer website
              </p>
              <span className={styles.recentProject_created}>
                created: 10-02-2023
              </span>
            </div>
          </div>

          {/* Project 5 */}
          <div className={styles.recentProject}>
            <img
              className={styles.recentProject_img}
              src="/img/message.png"
              alt=""
            />
            <div className="projectDetail">
              <h4 className={styles.text_h4}>Webby Assessment</h4>
              <p className={styles.recentProject_p}>
                Create front end developer website
              </p>
              <span className={styles.recentProject_created}>
                created: 10-02-2023
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer section */}

      <section className={styles.footer}>
        <Footer />
      </section>
    </div>
  );
}

export default Home;
