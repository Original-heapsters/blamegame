import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import styles from './contentArea.module.css';
import Comment from './Comment';
import Hook from './Hook';
import getChatHistory from '../../Api/Chat/getChatHistory';
import Reply from './Reply';
import Modal from '../modal/modal';
import Ruleset from '../Modals/Ruleset';

const socket = io.connect('https://blame-game-api.onrender.com');

export default function ContentArea({ currentGame }) {
  const [messageLog, setMessageLog] = useState([]);
  const [isOpen, setisOpen] = useState(false);

  useEffect(() => {
    getChatHistory(currentGame.name)
      .then((log) => {
        setMessageLog(log);
      });
  }, [currentGame.name]);

  function newMessageHandler(data) {
    setMessageLog((prev) => [...prev, data]);
  }
  useEffect(() => {
    socket.on('general', newMessageHandler);
    return () => {
      socket.off('general', newMessageHandler);
    };
  }, []);

  const closeModal = () => {
    setisOpen(false);
  };

  return (
    <div className={styles.contentArea}>
      <button type="button" className={styles.button} onClick={() => { setisOpen(true); }}>{currentGame.name}</button>
      <Modal open={isOpen} onClose={closeModal} currentGame={currentGame}>
        <Ruleset game={currentGame} />
      </Modal>
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
      <Reply socket={socket} />
    </div>
  );
}
