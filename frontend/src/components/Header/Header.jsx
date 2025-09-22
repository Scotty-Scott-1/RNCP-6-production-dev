import React from 'react';
import Nav from './Nav/nav.jsx';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <Nav />
    </header>
  );
};

export default Header;
