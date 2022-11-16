import React, { useState } from 'react';
import LoginModal from './LoginModal';
import * as api from '../../Api/Authentication/signIn/index';

function Header({
  triggerLogin, username, setUsername,
}) {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const handleLogin = () => {
    setIsLoggingIn(true);
  };

  const handleLoginAbort = () => {
    setIsLoggingIn(false);
  };

  const loginSubmit = () => {
    async function signIn(postInfo) {
      const url = await api.signIn(postInfo);
      return url;
    }

    const formData = new FormData();
    formData.append('username', username);

    signIn(formData)
      .then(() => {
        triggerLogin(username);
        setIsLoggingIn(false);
      });
  };

  return (
    <div className="header">
      <div className="header__admin">
        <LoginModal
          onClick={handleLogin}
          loggingIn={isLoggingIn}
          closeModal={handleLoginAbort}
          username={username}
          login={loginSubmit}
          setUsername={setUsername}
        />
        <h3 className="header__admin__username">{username}</h3>
      </div>
    </div>
  );
}

export default Header;
