import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import LoginForm from './LoginForm';

function AuthenticationModal({
  showAuthenticationModal,
  closeModal,
  login,
}) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const authClick = () => {
    login(username);
    login(password);
    login(email);
  };
  return (
    <Modal show={showAuthenticationModal} onHide={closeModal} dialogClassName="modal-90w">
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      {username}
      <LoginForm
        setUsername={setUsername}
        setPassword={setPassword}
        setEmail={setEmail}
      />
      <Modal.Footer>
        <Button variant="primary" onClick={authClick}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AuthenticationModal;
