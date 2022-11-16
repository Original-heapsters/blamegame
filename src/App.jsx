import React from 'react';
// import LoginModal from './Components/Modals/LoginModal';
import CreateModalForm from './Components/Modals/LoginModal';
import Header from './Components/Modals/Header';
import LoginForm from './Components/Modals/LoginForm';

export default function App() {
  return (
    <div className="App">
      <button type="button">Show Modal</button>
      <Header />
      <CreateModalForm />
      <LoginForm />
    </div>
  );
}
