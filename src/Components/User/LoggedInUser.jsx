import React from 'react';
import styles from './loggedInUser.module.css';

export default function LoggedInUser({
  user,
  logoutHandler,
}) {
  const userImg = user.profileUrl || 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp';
  const { username } = user;
  return (
    <div className={styles.loggedInUser}>
      <img
        src={userImg}
        className={styles.img}
        alt="test"
      />
      <h5 className={styles.userName}>
        {username}
      </h5>
      <button className={styles.logoutButton} type="button" onClick={logoutHandler}>Logout</button>
    </div>
  );
}
