import React from 'react';
import styles from './onlinecard.module.css';

export default function OnlineCard({
  img = 'https://e9g2x6t2.rocketcdn.me/wp-content/uploads/2022/06/linkedin-headshot-photography-examples-5-1.jpg',
  name = 'monica leu',
  isCurrentUser = false,
  isOnline,
}) {
  return (
    <div className={styles.onlineCard}>
      <div className={styles.imgContainer}>
        <img alt="" src={img} />
        <div
          className={styles.isOnline}
          style={{ backgroundColor: `${isOnline ? 'lime' : 'grey'}` }}
        >
          {' '}
        </div>
      </div>
      <h6>{name}</h6>
      <span className={styles.span}>{ isCurrentUser ? '(you)' : '' }</span>
    </div>
  );
}
