import React from 'react'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navigation/Navbar'
import styles from '../Home/home.module.css'


function Project() {
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

            </section>

            {/* Recent project */}
            <section className={styles.projectContainer}>

            </section>

            {/* Footer section */}

            <section className={styles.footer}>
                <Footer />
            </section>
        </div>
    )
}

export default Project