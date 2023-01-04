import React, { useState, useEffect, useCallback } from 'react';
import styles from './reply.module.css';

export default function Reply({ socket }) {
  const [msg, setMsg] = useState('');

  const sendMessage = useCallback(() => {
    socket.emit('chatMessage', { game: 'general', user: 'testUser', msg });
  }, [msg, socket]);

  useEffect(() => {
    const listener = (event) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        console.log('Enter key was pressed. Run your function.');
        event.preventDefault();
        sendMessage();
        setMsg('');
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [sendMessage]);

  return (
    <div className={styles.replyContainer}>
      <div className={styles.replyCont}>
        <input type="text" name="reply" className={styles.reply} placeholder="reply..." onChange={(e) => { setMsg(e.target.value); }} value={msg} />
      </div>
      <button type="button" className={styles.btn} onClick={() => { sendMessage(); setMsg(''); }}>submit</button>
    </div>
  );
}
