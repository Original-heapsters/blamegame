import React from 'react';
import Player from '../Util/Player';
import styles from './hook.module.css';

const { REACT_APP_API_SERVER, REACT_APP_API_SERVER_LOCAL, REACT_APP_TEST_LOCAL } = process.env;

export default function Hook({
  index,
  id,
  player,
  consequence,
  hook,
  audio,
  date,
}) {
  const userImg = player.profileUrl || 'https://funny-photo.s3.amazonaws.com/templates/1300/preview220.jpg';
  const readableDate = new Date(date).toLocaleString('en-US');
  const apiServer = REACT_APP_TEST_LOCAL === 'true' ? REACT_APP_API_SERVER_LOCAL : REACT_APP_API_SERVER;
  const audioUrl = `${apiServer}${audio}`;
  const hookContent = `${hook}:${consequence.rule} -> ${consequence.cause}`;

  return (
    <div
      key={id}
      className={index % 2 === 0 ? styles.hookContainer : styles.hookContainerAlt}
    >
      <img
        src={userImg}
        className={styles.img}
        alt="test"
      />
      <div className={styles.nameReplyContainer}>
        <h6 className={styles.h7}>
          { player.username }
          <span className={styles.span}>{ readableDate }</span>
        </h6>
        <div className={styles.content}>
          {hookContent}
        </div>
        <Player url={audioUrl} />
      </div>
    </div>
  );
}
