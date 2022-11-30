import React, { useState } from 'react';
// import AuthenticationModal from './Components/Modals/LoginModal';
// import AuthenticationModal from './Components/Modals/AuthenticationModal';
import Header from './Components/Modals/Header';
import LoginForm from './Components/Modals/LoginForm';
import Layout from './Components/Layout';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const modalHandler = () => {
    setModalOpen(!modalOpen);
  };

  const modalHideHandler = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className="App">
      <Layout />
      <button type="button" onClick={modalHandler}>Show Modal</button>
      <Header />
      // <AuthenticationModal closeModal={modalHideHandler} loggingIn={modalOpen} />
      <LoginForm />
    </div>
  );
}
