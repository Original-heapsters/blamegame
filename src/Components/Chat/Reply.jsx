import React, { useState, useCallback } from 'react';
import styles from './reply.module.css';

export default function Reply({ currentGame, username, socket }) {
  // ///////////////////////////////// STATE ///////////////////////////////////
  const [msg, setMsg] = useState('');

  // ///////////////////////////////// EFFECTS ///////////////////////////////////
  const sendMessage = useCallback(() => {
    if (currentGame && msg !== '') {
      socket.emit('chatMessage', { game: currentGame.name, user: username, msg });
    }
  }, [msg, currentGame, username, socket]);

  // ///////////////////////////////// HANDLERS ///////////////////////////////////
  const inputChangeHandler = (e) => {
    setMsg(e.target.value);
  };

  const enterListener = (e) => {
    if ((e.key === 'Enter' || e.key === 'NumpadEnter') && msg !== '') {
      sendMessage();
      setMsg('');
    }
  };

  const sendMessageHandler = () => {
    sendMessage();
    setMsg('');
  };

  return (
    <div className={styles.replyContainer}>
      <div className={styles.replyCont}>
        <input type="text" name="reply" className={styles.reply} placeholder="reply..." onChange={inputChangeHandler} onKeyDown={enterListener} value={msg} />
      </div>
      <button type="button" className={styles.btn} onClick={sendMessageHandler}>submit</button>
    </div>
  );
}
