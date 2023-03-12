import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Hook from './Hook';
import Comment from './Comment';
import getChatHistory from '../../Api/Chat/getChatHistory';
import styles from './messageLog.module.css';

const { REACT_APP_API_SERVER, REACT_APP_API_SERVER_LOCAL, REACT_APP_TEST_LOCAL } = process.env;

export default function MessageLog({
  currentGame,
  socket,
}) {
  const [messageLog, setMessageLog] = useState([]);
  const messagesEndRef = useRef();

  useEffect(() => {
    if (currentGame) {
      getChatHistory(currentGame.name)
        .then((log) => {
          const sorted = log.sort((a, b) => new Date(a.date) - new Date(b.date));
          setMessageLog(sorted);
        });
    } else {
      setMessageLog([]);
    }
  }, [currentGame]);

  useEffect(() => {
    const newMessageHandler = (data) => {
      if (data.type === 'hook') {
        const apiServer = REACT_APP_TEST_LOCAL === 'true' ? REACT_APP_API_SERVER_LOCAL : REACT_APP_API_SERVER;
        const audioUrl = `${apiServer}${data.publicAudio}`;
        const notification = new Audio(audioUrl);
        notification.play();
      }
      setMessageLog((prev) => {
        const unsorted = [...prev, data];
        const sorted = unsorted.sort((a, b) => new Date(a.date) - new Date(b.date));
        return sorted;
      });
    };

    if (currentGame) {
      socket.on(currentGame.name, newMessageHandler);
      return () => {
        socket.off(currentGame.name, newMessageHandler);
      };
    }
    return () => {};
  }, [socket, currentGame]);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messageLog]);

  return (
    <Box className={styles.messageLogContainer}>
      <List className={styles.messageList} component="nav">
        {messageLog
          && messageLog.map((message, idx) => (message.type === 'hook'
            ? (
              <Hook
                index={idx}
                key={message.id}
                player={message.player}
                profileUrl={message.profileUrl}
                date={message.date}
                message={message.message}
                consequence={message.consequence}
                hook={message.hook}
                audio={message.publicAudio}
              />
            )
            : (
              <Comment
                index={idx}
                key={message.id}
                player={message.player}
                profileUrl={message.profileUrl}
                date={message.date}
                message={message.message}
              />
            )))}
        <ListItem ref={messagesEndRef} />
      </List>
    </Box>
  );
}
