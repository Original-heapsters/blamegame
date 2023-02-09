import React from 'react';
import TextField from '@mui/material/TextField';
import styles from './reply.module.css';

export default function Reply({
  message,
  setMessage,
  sendMessage,
}) {
  const inputChangeHandler = (e) => {
    setMessage(e.target.value);
  };

  const enterListener = (e) => {
    if ((e.key === 'Enter' || e.key === 'NumpadEnter') && message !== '') {
      sendMessage();
      setMessage('');
    }
  };

  return (
    <TextField className={styles.replyTextField} variant="outlined" multiline minRows="2" fullWidth onChange={inputChangeHandler} onKeyDown={enterListener} value={message} />
  );
}
