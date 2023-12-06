import React from "react";

import Container from "../reusables/Container";

import styles from "./styles.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Container wide>
        <div className={styles.header__inner}>
          <a href="#" className={styles.logo__wrapper}>
            <img
              src="/images/logo-white.svg"
              alt="recco logo"
              className={styles.logo}
            />
          </a>
          <nav className={styles.nav}>
            <ul className={styles.list}>
              <li className={styles.item}>
                <a href="#" className={`${styles.link} ${styles.link__active}`}>
                  Apps
                </a>
                <img src="./images/arrow-down.svg" alt="" />
              </li>
              <li className={styles.item}>
                <a href="#" className={styles.link}>
                  Data
                </a>
              </li>
              <li className={styles.item}>
                <a href="#" className={styles.link}>
                  Identities
                </a>
              </li>
              <li className={styles.item}>
                <a href="#" className={styles.link}>
                  Alerts
                </a>
              </li>
              <li className={styles.item}>
                <a href="#" className={styles.link}>
                  Investigation Center
                </a>
              </li>{" "}
              <li className={styles.item}>
                <a href="#" className={styles.link}>
                  Configurations
                </a>
              </li>
            </ul>
          </nav>
          <div className={styles.profile}>
            <img
              src="/images/avatar.png"
              alt="Security-Demo 2"
              className={styles.profile__avatar}
            />
            <button className={styles.profile__name}>
              Security-Demo 2 <img src="./images/arrow-down.svg" alt="" />
            </button>
            <button className={styles.header__askmore}>
              <img src="./images/ask-more.svg" alt="" />
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}
