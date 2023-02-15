import React, { useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function SignInModal({ signInOpen, setSignInOpen, loginHandler }) {
  const emailRef = useRef(null);
  const passRef = useRef(null);

  const handleClose = () => {
    setSignInOpen(false);
  };

  const handleSignIn = async () => {
    const email = emailRef.current.value;
    const pass = passRef.current.value;
    const authValues = {
      email,
      password: pass,
    };
    await loginHandler(authValues, true);
    setSignInOpen(false);
  };

  return (
    <Dialog open={signInOpen} onClose={handleClose}>
      <DialogTitle>Sign In</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter your email and password to sign in
        </DialogContentText>
        <TextField
          inputRef={emailRef}
          autoFocus
          margin="dense"
          id="email"
          label="Email"
          type="email"
          fullWidth
          variant="standard"
        />
        <TextField
          inputRef={passRef}
          autoFocus
          margin="dense"
          id="pass"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSignIn}>Sign In</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SignInModal;
