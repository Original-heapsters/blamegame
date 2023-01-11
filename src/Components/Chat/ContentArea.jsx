import React, { useEffect, useState } from 'react';
//import io from 'socket.io-client';
import styles from './contentArea.module.css';
import Comment from './Comment';
import Hook from './Hook';
import getChatHistory from '../../Api/Chat/getChatHistory';
import Reply from './Reply';
import Modal from '../modal/modal';
import Accordion from '../modal/Accordion';

//const socket = io.connect('https://blame-game-api.onrender.com');

export default function ContentArea({ currentGame, socket }) {
  const [messageLog, setMessageLog] = useState([]);
  const [isOpen, setisOpen] = useState(false);

  useEffect(() => {
    console.log('hello from useEffet on getchat')
    getChatHistory(currentGame)
      .then((log) => {
        setMessageLog(log);
      });
  }, [currentGame]);

  function newMessageHandler(data) {
    setMessageLog((prev) => [...prev, data]);
  }
  useEffect(() => {
    socket.on('general', newMessageHandler);
    return () => {
      socket.off('general', newMessageHandler);
    };
  }, []);
  return (
    <div className={styles.contentArea}>
      <button type="button" className={styles.button} onClick={() => { setisOpen(true); }}>{currentGame}</button>
      <Modal open={isOpen} onClose={() => { setisOpen(false); }} currentGame={currentGame}><Accordion title="section-1" content="hello" /></Modal>
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
      <Reply socket={socket} />
    </div>
  );
}
