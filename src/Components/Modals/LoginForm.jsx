import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function LoginForm({ setUsername }) {
  const handleUsernameChange = (event) => {
    const fieldVal = event.target.value;
    setUsername(fieldVal);
  };

  return (
    <Modal.Body>
      <Stack gap={2}>
        <Stack direction="horizontal" gap={2}>
          <FloatingLabel className="me-auto" controlId="usernameInput" label="Username">
            <Form.Control type="email" placeholder="name@example.com" onChange={handleUsernameChange} />
          </FloatingLabel>
        </Stack>
      </Stack>
    </Modal.Body>
  );
}

export default LoginForm;
