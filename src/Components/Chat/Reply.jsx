import React, { useState } from 'react';
import styles from './reply.module.css';

export default function Reply({ socket }) {
  const [msg, setMsg] = useState('');

  const sendMessage = () => {
    socket.emit('chatMessage', { game: 'general', user: 'testUser', msg });
  };
  return (
    <div className={styles.replyContainer}>
      <div className={styles.replyCont}>
        <input type="text" name="reply" className={styles.reply} placeholder="reply..." onChange={(e) => { setMsg(e.target.value); }} value={msg} />
      </div>
      <button type="button" className={styles.btn} onClick={() => { sendMessage(); setMsg(''); }}>submit</button>
    </div>
  );
}
