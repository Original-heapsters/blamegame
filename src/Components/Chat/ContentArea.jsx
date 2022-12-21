import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import styles from './contentArea.module.css';
import Comment from './Comment';
import Hook from './Hook';
import getChatHistory from '../../Api/Chat/getChatHistory';
import Reply from './Reply';

const socket = io.connect('https://blame-game-api.onrender.com');

export default function ContentArea({ currentGame }) {
  const [messageLog, setMessageLog] = useState([]);

  useEffect(() => {
    getChatHistory('blamegame_api')
      .then((log) => {
        setMessageLog(log);
      });
      
  }, []);
  
  function newMessageHandler(data){
    console.log(data);
    setMessageLog((prev) => [...prev, data]);
  }
  useEffect(() => {
    socket.on('general', newMessageHandler);
   console.log("inside useEffect socket")
    return () =>{
      socket.off('general', newMessageHandler);
    }
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
      <Reply socket={socket}/>
    </div>
  );
}
