import React, { useEffect, useState } from 'react';

import styles from './contentArea.module.css';
import Comment from './Comment';
import Hook from './Hook';
import getChatHistory from '../../Api/Chat/getChatHistory';

export default function ContentArea({
  currentGame,
}) {
  const [messageLog, setMessageLog] = useState([]);

  useEffect(() => {
    getChatHistory('blamegame_api')
      .then((log) => {
        setMessageLog(log);
      });
  }, []);

  return (
    <div className={styles.contentArea}>
      <h2 className={styles.h2}>{currentGame}</h2>
      <div className={styles.comments}>
        {
          messageLog.map((message) => (message.type === 'hook'
            ? (
              <Hook
                key={message.id}
                player={message.player}
                date={message.date}
                message={message.message}
                consequence={message.consequence}
                hook={message.hook}
                audio={message.publicAudio}
              />
            )
            : (
              <Comment
                key={message.id}
                player={message.player}
                date={message.date}
                message={message.message}
              />
            )))
        }
      </div>
      <div className={styles.replyContainer}>
        <div className={styles.replyCont}>
          <input type="text" name="reply" className={styles.reply} placeholder="Reply..." />
        </div>
        <button type="button" className={styles.btn}>submit</button>
      </div>
    </div>
  );
}
