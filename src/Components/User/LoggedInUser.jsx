import React from 'react';

export default function LoggedInUser({
  user,
  logoutHandler,
}) {
  const { username } = user;
  return (
    <div>
      <h5>
        {username}
      </h5>
      <button type="button" onClick={logoutHandler}>Logout</button>
    </div>
  );
}
