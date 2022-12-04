import React from 'react';
import Player from '../Util/Player';
import styles from './hook.module.css';

const { REACT_APP_API_SERVER } = process.env;

export default function Hook({
  id,
  player,
  consequence,
  hook,
  audio,
  date,
}) {
  const userImg = null || 'https://funny-photo.s3.amazonaws.com/templates/1300/preview220.jpg';
  const readableDate = new Date(date).toLocaleString('en-US');
  const audioUrl = `${REACT_APP_API_SERVER}${audio}`;
  const hookContent = `${hook}:${consequence.rule} -> ${consequence.cause}`;

  return (
    <div key={id} className={styles.hookContainer}>
      <img
        src={userImg}
        className={styles.img}
        alt="test"
      />
      <div className={styles.nameReplyContainer}>
        <h7 className={styles.h7}>
          { player.username }
          <span className={styles.span}>{ readableDate }</span>
        </h7>
        <div className={styles.rply}>
          {hookContent}
        </div>
        <Player url={audioUrl} />
      </div>
    </div>
  );
}
