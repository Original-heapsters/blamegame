import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import styles from './header.module.css';
import LoggedInUser from '../User/LoggedInUser';
import SignUpModal from '../Modals/SignUpModal';
import SignInModal from '../Modals/SignInModal';
import seedBackend from '../../Api/Debug/seed';
import triggerHook from '../../Api/Debug/hook';

export default function Header({
  loggedInUser,
  logoutHandler,
  loginHandler,
  currentGame,
}) {
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);

  const seedHandler = () => {
    seedBackend();
    window.location.reload(0);
  };

  const randHookHandler = async () => {
    await triggerHook(loggedInUser.email, currentGame.name);
  };

  const signInHandler = () => {
    setSignInOpen(true);
  };

  const signUpHandler = () => {
    setSignUpOpen(true);
  };

  return (
    <Box className={styles.headerAppBar}>
      <Paper sx={{ backgroundColor: 'primary.main' }}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, color: 'primary.contrastText' }}>
            BlameGame
          </Typography>
          <Button variant="contained" color="secondary" onClick={randHookHandler}>Trigger hook</Button>
          <Button variant="contained" color="secondary" onClick={seedHandler}>Re-Seed</Button>
          { loggedInUser
            ? <LoggedInUser user={loggedInUser} logoutHandler={logoutHandler} />
            : (
              <div className={styles.authButtons}>
                <Button variant="contained" color="secondary" onClick={signInHandler}>Sign In</Button>
                <Button variant="contained" color="secondary" onClick={signUpHandler}>Sign Up</Button>
                <SignUpModal
                  signUpOpen={signUpOpen}
                  setSignUpOpen={setSignUpOpen}
                  loginHandler={loginHandler}
                />
                <SignInModal
                  signInOpen={signInOpen}
                  setSignInOpen={setSignInOpen}
                  loginHandler={loginHandler}
                />
              </div>
            )}
        </Toolbar>
      </Paper>
    </Box>
  );
}
