import React from 'react';

import styles from './contentArea.module.css';

import Comment from './Comment';

export default function ContentArea() {
  return (
    <div className={styles.contentArea}>
      <h2 className={styles.h2}>title goes here</h2>
      <div className={styles.comments}>
        <Comment />
      </div>
      <div className={styles.replycontainer}>
        <input type="text" name="reply" className={styles.reply} />
        <button type="button" className={styles.btn}>submit</button>
      </div>
    </div>
  );
}
