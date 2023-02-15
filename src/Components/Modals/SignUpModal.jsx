import React, { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Avatar from '@mui/material/Avatar';
import ProfilePickerModal from './ProfilePicker';
import styles from './signUpModal.module.css';

function SignUpModal({ signUpOpen, setSignUpOpen, loginHandler }) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [chosenAvatar, setChosenAvatar] = useState('');
  const uNameRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);

  const handleClose = () => {
    setSignUpOpen(false);
  };

  const handleProfilePicker = () => {
    setPickerOpen(true);
  };

  const handleSignUp = async () => {
    const uName = uNameRef.current.value;
    const email = emailRef.current.value;
    const pass = passRef.current.value;
    const authValues = {
      username: uName,
      email,
      password: pass,
      profileUrl: chosenAvatar,
    };
    await loginHandler(authValues, false);
    setSignUpOpen(false);
  };

  return (
    <Dialog open={signUpOpen} onClose={handleClose}>
      <DialogTitle>Sign Up</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter a username, email, password and choose your avatar to use blame game
        </DialogContentText>
        <TextField
          inputRef={uNameRef}
          autoFocus
          margin="dense"
          id="username"
          label="Username"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          inputRef={emailRef}
          autoFocus
          margin="dense"
          id="email"
          label="Email Address"
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
      <DialogContent>
        <Avatar
          className={styles.chosenAvatar}
          src={chosenAvatar}
          alt="avatar"
          loading="lazy"
        />
        <Button variant="contained" onClick={handleProfilePicker}>Change Avatar</Button>
        <ProfilePickerModal
          pickerOpen={pickerOpen}
          setPickerOpen={setPickerOpen}
          setChosenAvatar={setChosenAvatar}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSignUp}>Sign Up</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SignUpModal;
