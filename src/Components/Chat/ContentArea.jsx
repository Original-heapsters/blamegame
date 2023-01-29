import React, {
  useRef,
  useEffect,
  useState,
} from 'react';
import styles from './contentArea.module.css';
import Comment from './Comment';
import Hook from './Hook';
import getChatHistory from '../../Api/Chat/getChatHistory';
import Reply from './Reply';
import Modal from '../modal/modal';
import Ruleset from '../Modals/Ruleset';

const { REACT_APP_API_SERVER, REACT_APP_API_SERVER_LOCAL, REACT_APP_TEST_LOCAL } = process.env;

export default function ContentArea({ currentGame, username, socket }) {
  // ///////////////////////////////// STATE ///////////////////////////////////
  const [messageLog, setMessageLog] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const messagesEndRef = useRef();

  // ///////////////////////////////// EFFECTS ///////////////////////////////////
  useEffect(() => {
    if (currentGame) {
      getChatHistory(currentGame.name)
        .then((log) => {
          const sorted = log.sort((a, b) => new Date(a.date) - new Date(b.date));
          setMessageLog(sorted);
        });
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
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
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    if (currentGame) {
      socket.on(currentGame.name, newMessageHandler);
      return () => {
        socket.off(currentGame.name, newMessageHandler);
      };
    }
    return () => {};
  }, [socket, currentGame]);

  // ///////////////////////////////// HANDLERS ///////////////////////////////////
  const modalOpenHandler = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className={styles.contentArea}>
      {
        currentGame
          ? <button type="button" className={styles.button} onClick={modalOpenHandler}>{currentGame.name}</button>
          : <button type="button" className={styles.button}>General</button>
      }
      <Modal open={modalOpen} onClose={modalOpenHandler} currentGame={currentGame}>
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
        <div className={styles.messagesEndRef} ref={messagesEndRef} />
      </div>
      <div className={styles.replyContainer}>
        <div className={styles.replyCont}>
          <input type="text" name="reply" className={styles.reply} placeholder="Reply..." />
        </div>
        <button type="button" className={styles.btn}>submit</button>
      </div>
      <Reply currentGame={currentGame} username={username} socket={socket} />
    </div>
  );
}
