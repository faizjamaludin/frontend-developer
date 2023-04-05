import React, { useState, useEffect } from "react";

import { Navigate } from "react-router-dom";
import Navbar from "../../components/Navigation/Navbar";
import styles from "./home.module.css";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";

interface ProjectProp {
  details: { img: string; name: string; desc: string; created: string; }[];
}

function Home() {

  const projectDetails: ProjectProp["details"] = [
    {
      img: "/img/no-image.png",
      name: "Frontend",
      desc: "Create front end developer website",
      created: "10-02-2023",
    },
    {
      img: "/img/good-job.png",
      name: "React JS",
      desc: "Create front end developer website",
      created: "10-02-2023",
    },
    {
      img: "/img/hi.png",
      name: "React Native",
      desc: "Create front end developer website",
      created: "10-02-2023",
    },
    {
      img: "/img/broken.png",
      name: "GraphQL",
      desc: "Create front end developer website",
      created: "10-02-2023",
    },
    {
      img: "/img/message.png",
      name: "Typescript",
      desc: "Create front end developer website",
      created: "10-02-2023",
    },
  ];


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
              <span className={styles.btnSpace}></span>
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

          {projectDetails.map((project, index) => (
            <div className={styles.recentProject} key={index}>
              <img
                className={styles.recentProject_img}
                src={project.img}
                alt=""
              />
              <div className="projectDetail">
                <h4 className={styles.text_h4}>{project.name}</h4>
                <p className={styles.recentProject_p}>{project.desc}</p>
                <span className={styles.recentProject_created}>
                  created: {project.created}
                </span>
              </div>
            </div>
          ))}
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
