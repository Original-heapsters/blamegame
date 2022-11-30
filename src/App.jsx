import React from 'react';
// import LoginModal from './Components/Modals/LoginModal';
import CreateModalForm from './Components/Modals/LoginModal';
import Header from './Components/Modals/Header';
import LoginForm from './Components/Modals/LoginForm';
import Layout from './Components/Layout';

export default function App() {
  return (
    <div className="App">
      <Layout />
      <button type="button">Show Modal</button>
      <Header />
      <CreateModalForm />
      <LoginForm />
    </div>
  );
}
