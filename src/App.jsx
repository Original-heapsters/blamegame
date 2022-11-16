import React, { useEffect, useState } from 'react';
import Modal from './Components/Modals/Modal';
import ChatLog from './Components/Chat/chatLog';
import getChatHistory from './Api/Chat/getChatHistory';

export default function App() {
  const [messageLog, setMessageLog] = useState([]);

  useEffect(() => {
    getChatHistory('blamegame_api')
      .then((log) => {
        setMessageLog(log);
      });
  }, []);

  return (
    <div className="App">
      <button type="button">Show Modal</button>
      <Modal />
      <ChatLog messages={messageLog} />
    </div>
  );
}
