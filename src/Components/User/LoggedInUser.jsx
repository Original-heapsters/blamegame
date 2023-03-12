import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styles from './loggedInUser.module.css';

export default function LoggedInUser({
  user,
  logoutHandler,
}) {
  const userImg = user.profileUrl || 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp';
  const { username } = user;
  return (
    <Box className={styles.loggedInUser}>
      <Avatar
        className={styles.img}
        src={userImg}
        alt={username}
      />
      <Typography variant="h6" component="div" className={styles.userName} color="primary.contrastText">
        {username}
      </Typography>
      <Button variant="contained" color="secondary" className={styles.logoutButton} onClick={logoutHandler}>Logout</Button>
    </Box>
  );
}
