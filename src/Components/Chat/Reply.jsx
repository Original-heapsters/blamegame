import React, { useState } from 'react';
import styles from './reply.module.css';

export default function Reply({ socket }) {
  const [msg, setMsg] = useState('hello');
  const sendMessage = () => {
    socket.emit('chatMessage', { game: 'general', user: 'testUser', msg });
  };
  return (
    <div className={styles.replyContainer}>
      <div className={styles.replyCont}>
        <input type="text" name="reply" className={styles.reply} placeholder="Reply..." onChange={(e) => { setMsg(e.target.value); }} />
      </div>
      <button type="button" className={styles.btn} onClick={sendMessage}>submit</button>
    </div>
  );
}
