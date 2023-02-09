import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import GameListItem from '../Game/GameListItem';
import styles from './gameList.module.css';

export default function GameList({
  gameList,
  currentGame,
  switchRooms,
}) {
  return (
    <Box className={styles.gameList}>
      <Typography variant="h5" component="div">
        Games
      </Typography>
      <List component="nav">
        {gameList
          && gameList.map((game) => (
            <GameListItem
              key={game.id}
              game={game}
              isCurrentGame={currentGame && game.name === currentGame.name}
              switchRooms={switchRooms}
            />
          ))}
      </List>
    </Box>
  );
}
