import React from 'react';
import styles from '../layout.module.css';

import ContentArea from './ContentArea';
export default function Layout() {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>menu</div>
      <div className={styles.content}>
        <ContentArea />
      </div>
    </div>
  );
}
