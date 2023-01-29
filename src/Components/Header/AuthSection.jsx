import React, { useState } from 'react';
import styles from './authsection.module.css';
import AuthenticationModal from '../Modals/AuthenticationModal';
import LoggedInUser from '../User/LoggedInUser';
import seedBackend from '../../Api/Debug/seed';

export default function AuthSection({
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
    <div className={styles.credentials}>
      {
        loggedInUser
          ? <LoggedInUser user={loggedInUser} logoutHandler={logoutHandler} />
          : (
            <div>
              <button type="button" onClick={seedHandler}>Re-Seed</button>
              <button type="button" onClick={signInHandler}>Sign in</button>
              <button type="button" onClick={signUpHandler}>Sign up</button>
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
          )
      }
    </div>
  );
}
