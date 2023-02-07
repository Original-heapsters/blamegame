import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import styles from './header.module.css';
import LoggedInUser from '../User/LoggedInUser';
import AuthenticationModal from '../Modals/AuthenticationModal';
import seedBackend from '../../Api/Debug/seed';

export default function Header({
  signingIn,
  setSigningIn,
  loggedInUser,
  logoutHandler,
  setUsername,
  setPassword,
  setEmail,
  loginHandler,
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const seedHandler = () => {
    seedBackend();
    window.location.reload(0);
  };
  const signInHandler = () => {
    setSigningIn(true);
    setModalOpen(!modalOpen);
  };

  const signUpHandler = () => {
    setSigningIn(false);
    setModalOpen(!modalOpen);
  };

  const modalHideHandler = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <AppBar position="static" className={styles.headerAppBar}>
      <Toolbar>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          BlameGame
        </Typography>
        <Button className={styles.headerButton} onClick={seedHandler}>Re-Seed</Button>
        { loggedInUser
          ? <LoggedInUser user={loggedInUser} logoutHandler={logoutHandler} />
          : (
            <div>
              <Button className={styles.headerButton} onClick={signInHandler}>Sign In</Button>
              <Button className={styles.headerButton} onClick={signUpHandler}>Sign Up</Button>
              <AuthenticationModal
                closeModal={modalHideHandler}
                showModal={modalOpen}
                signingIn={signingIn}
                setUsername={setUsername}
                setPassword={setPassword}
                setEmail={setEmail}
                login={loginHandler}
              />
            </div>
          )}
      </Toolbar>
    </AppBar>
  );
}
