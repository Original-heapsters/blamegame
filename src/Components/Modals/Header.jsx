import React, { useState } from 'react';
import AuthenticationModal from './AuthenticationModal';
import * as api from '../../Api/Authentication/signIn/index';

function Header({
  triggerLogin, username, setUsername, password, setPassword, email, setEmail,
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
    formData.append('password', password);
    formData.append('email', email);

    signIn(formData)
      .then(() => {
        triggerLogin(username);
        setIsLoggingIn(false);
      });
  };

  return (
    <div className="header">
      <div className="header__admin">
        <AuthenticationModal
          onClick={handleLogin}
          loggingIn={isLoggingIn}
          closeModal={handleLoginAbort}
          username={username}
          password={password}
          email={email}
          login={loginSubmit}
          setUsername={setUsername}
          setPassword={setPassword}
          setEmail={setEmail}
        />
        <h3 className="header__admin__username">{username}</h3>
      </div>
    </div>
  );
}

export default Header;
