import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function RulesetModal({
  showRules, closeModal, gameName,
}) {
  useEffect(() => {

  }, []);
  return (
    <Modal show={showRules} onHide={closeModal} dialogClassName="modal-90w">
      <Modal.Header closeButton>
        <Modal.Title>{gameName}</Modal.Title>
      </Modal.Header>
      test
      <Modal.Footer>
        <Button variant="primary" onClick={closeModal}>OK</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RulesetModal;
