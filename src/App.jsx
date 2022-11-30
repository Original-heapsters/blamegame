import React, { useState } from 'react';
import AuthenticationModal from './Components/Modals/AuthenticationModal';
import Header from './Components/Modals/Header';
import Layout from './Components/Layout';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [username, setUsername] = useState('PaPaBl3SsS');
  const [password, setPassword] = useState('PaPaBl3SsS');
  const [email, setEmail] = useState('PaPaBl3SsS');

  const modalHandler = () => {
    setModalOpen(!modalOpen);
  };

  const modalHideHandler = () => {
    setModalOpen(!modalOpen);
  };

  const usernameHandler = () => {
    setUsername(username);
  };

  const passwordHandler = () => {
    setPassword(password);
  };

  const emailHandler = () => {
    setEmail(email);
  };

  return (
    <div className="App">
      <Layout />
      <button type="button" onClick={modalHandler}>Show Modal</button>
      <Header />
      <AuthenticationModal
        closeModal={modalHideHandler}
        loggingIn={modalOpen}
        setUsername={usernameHandler}
        setPassword={passwordHandler}
        setEmail={emailHandler}
      />
    </div>
  );
}
