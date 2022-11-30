import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import LoginForm from './LoginForm';

function AuthenticationModal({
  loggingIn, closeModal, login, setUsername, setPassword, setEmail, setSelectedFile, selectedFile,
}) {
  return (
    <Modal show={loggingIn} onHide={closeModal} dialogClassName="modal-90w">
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <LoginForm
        setSelectedFile={setSelectedFile}
        selectedFile={selectedFile}
        setUsername={setUsername}
        setPassword={setPassword}
        setEmail={setEmail}
      />
      <Modal.Footer>
        <Button variant="primary" onClick={login}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AuthenticationModal;
