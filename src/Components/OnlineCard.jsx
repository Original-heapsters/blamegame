import React from 'react';
import styles from './onlinecard.module.css';

export default function OnlineCard({
  img = 'https://e9g2x6t2.rocketcdn.me/wp-content/uploads/2022/06/linkedin-headshot-photography-examples-5-1.jpg',
  name = 'monica leu',
  isonline,
}) {
  return (
    <div className={styles.onlinecard}>
      <div className={styles.imgcontainer}>
        <img alt="" src={img} />
        <div
          className={styles.isonline}
          style={{ backgroundColor: `${isonline ? 'lime' : 'grey'}` }}
        >
          {' '}
        </div>
      </div>
      <h5>{name}</h5>
    </div>
  );
}
