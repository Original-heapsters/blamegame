import React from 'react';

import styles from './comment.module.css';

export default function Comment({
  id,
  player,
  date,
  message,
}) {
  const userImg = null || 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp';
  const readableDate = new Date(date).toLocaleString('en-US');

  return (
    <div key={id} className={styles.commentcontainer}>
      <img
        src={userImg}
        className={styles.img}
        alt="test"
      />
      <div className={styles.namerplycontainer}>
        <h3 className={styles.h3}>
          { player }
          <span className={styles.span}>{ readableDate }</span>
        </h3>
        <div className={styles.rply}>
          {message}
        </div>
      </div>
    </div>
  );
}
