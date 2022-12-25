import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import io from 'socket.io-client';
import styles from './contentArea.module.css';
import Comment from './Comment';
import Hook from './Hook';
import RulesetModal from '../Modals/Ruleset';
import getChatHistory from '../../Api/Chat/getChatHistory';
import Reply from './Reply';

const socket = io.connect('https://blame-game-api.onrender.com');

export default function ContentArea({ currentGame }) {
  const [messageLog, setMessageLog] = useState([]);
  const [showRules, setShowRules] = useState(false);
  // const [ruleset, setRuleset] = useState({});

  useEffect(() => {
    getChatHistory('blamegame_api')
      .then((log) => {
        setMessageLog(log);
      });
  }, []);

  const showRulesHandler = () => {
    setShowRules(!showRules);
  };

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
      <Button className={styles.gameTitle} onClick={showRulesHandler}>{currentGame}</Button>
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
      <RulesetModal showRules={showRules} closeModal={showRulesHandler} gameName={currentGame} />
      <Reply socket={socket} />
    </div>
  );
}
