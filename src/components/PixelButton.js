import React from 'react';
import styles from '../styles/PixelButton.module.css';
import Image from 'next/image';

function PixelButton({ onClick }) {
  return (
<button className={styles.pixelButton}>
  Button
  <span className={styles.pixelArt}>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </span>
</button>
  )
}

export default PixelButton;
