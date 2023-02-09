import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import PlayerListItem from '../User/PlayerListItem';
import styles from './playerList.module.css';

export default function PlayerList({
  playerList,
  loggedInUser,
}) {
  return (
    <Box className={styles.playerListContainer}>
      <Typography variant="h5" component="div" className={styles.playersHeader}>
        Players
      </Typography>
      <List className={styles.playerList} component="nav">
        {playerList
          && playerList.map((player) => (
            <PlayerListItem
              key={player.id}
              name={player.username}
              img={player.profileUrl}
              isOnline={player.isOnline}
            />
          ))}
        { loggedInUser
          ? (
            <PlayerListItem
              key={loggedInUser.id}
              name={loggedInUser.username}
              img={loggedInUser.profileUrl}
              isOnline
              isCurrentUser
            />
          )
          : <div />}
      </List>
    </Box>
  );
}
