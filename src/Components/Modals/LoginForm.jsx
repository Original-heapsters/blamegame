import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function LoginForm({ setUsername, setPassword, setEmail }) {
  const handleUsernameChange = (event) => {
    const fieldVal = event.target.value;
    setUsername(fieldVal);
  };
  const handlePasswordChange = (event) => {
    const fieldVal = event.target.value;
    setPassword(fieldVal);
  };

  const handleEmailChange = (event) => {
    const fieldVal = event.target.value;
    setEmail(fieldVal);
  };

  return (
    <Modal.Body>
      <Stack gap={2}>
        <Stack direction="horizontal" gap={2}>
          <FloatingLabel className="me-auto" controlId="usernameInput" label="Username">
            <Form.Control type="username" placeholder="username" onChange={handleUsernameChange} />
          </FloatingLabel>
          <FloatingLabel className="me-auto" controlId="passwordInput" label="Password">
            <Form.Control type="password" placeholder="password" onChange={handlePasswordChange} />
          </FloatingLabel>
          <FloatingLabel className="me-auto" controlId="emailInput" label="Email">
            <Form.Control type="email" placeholder="name@example.com" onChange={handleEmailChange} />
          </FloatingLabel>
        </Stack>
      </Stack>
    </Modal.Body>
  );
}

export default LoginForm;
