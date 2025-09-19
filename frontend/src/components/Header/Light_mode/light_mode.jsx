import React, { useState, useEffect } from 'react';
import styles from './light_mode.module.css';
import lightBulbWhite from '../../../assets/light_bulb_white.png';
import lightBulbBlack from '../../../assets/light_bulb_black.png';

const LightMode = () => {
  const [isLightMode, setIsLightMode] = useState(false);

  const toggleLightMode = () => {
    setIsLightMode(!isLightMode);
  };

  const containerClass = `${styles.lightBulbContainer} ${isLightMode ? styles.lightMode : styles.darkMode}`;

  useEffect(() => {
    document.body.classList.remove('lightBackground', 'darkBackground');
    document.body.classList.add(isLightMode ? 'lightBackground' : 'darkBackground');
  }, [isLightMode]);

  return (
    <div
      className={containerClass}
      onClick={toggleLightMode}
      role="button"
    >
      <img
        src={isLightMode ? lightBulbBlack : lightBulbWhite}
        alt="Light Bulb"
        className={styles.lightBulb}
      />
    </div>
  );
};

export default LightMode;
