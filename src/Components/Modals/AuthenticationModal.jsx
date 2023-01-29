import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import LoginForm from './LoginForm';

function AuthenticationModal({
  signingIn,
  showModal,
  closeModal,
  login,
  setUsername,
  setPassword,
  setEmail,
  setSelectedFile,
  selectedFile,
}) {
  return (
    <Modal show={showModal} onHide={closeModal} dialogClassName="modal-90w">
      <Modal.Header closeButton>
        <Modal.Title>{ `Sign ${signingIn ? 'in' : 'up'}` }</Modal.Title>
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
