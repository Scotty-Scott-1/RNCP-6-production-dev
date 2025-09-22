import React from 'react';
import Nav from './Nav/nav.jsx';
import LightMode from './Light_mode/light_mode.jsx';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <Nav />
      <LightMode />
    </header>
  );
};

export default Header;
