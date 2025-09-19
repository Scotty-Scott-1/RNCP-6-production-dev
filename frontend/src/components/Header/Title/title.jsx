import React, { useState } from 'react';
import styles from './title.module.css';

const Title = () => {
  const [title, setTitle] = useState('Phishing Simulator');

  return (
	<div className={styles.titleContainer}>
	  <h1 className={styles.title}>{title}</h1>
	</div>
  );
}

export default Title;
