import React, { useEffect, useState } from 'react';
// import LoginModal from './Components/Modals/LoginModal';
import CreateModalForm from './Components/Modals/LoginModal';
import Header from './Components/Modals/Header';
import LoginForm from './Components/Modals/LoginForm';
import ChatLog from './Components/Chat/chatLog';
import Layout from './Components/Layout';
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
      <Layout />
      <button type="button">Show Modal</button>
      <Header />
      <CreateModalForm />
      <LoginForm />
      <ChatLog messages={messageLog} />
    </div>
  );
}
