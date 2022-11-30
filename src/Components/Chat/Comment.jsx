import React from 'react';

import styles from './comment.module.css';

export default function Comment() {
  return (
    <div className={styles.commentcontainer}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Michelle_Borromeo_Actor_Headshots_30.jpg"
        className={styles.img}
        alt="test"
      />
      <div className={styles.namerplycontainer}>
        <h3 className={styles.h3}>
          name
          <span className={styles.span}>7 hours ago</span>
        </h3>
        <div className={styles.rply}>
          hello does anyone know the name of the new company we acquired?
        </div>
      </div>
    </div>
  );
}
