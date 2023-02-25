import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
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
    <Box className={styles.gameList} sx={{ backgroundColor: 'primary.main' }}>
      <Paper sx={{ backgroundColor: 'secondary.main' }}>
        <Typography variant="h5" component="div" sx={{ color: 'secondary.contrastText' }}>
          Games
        </Typography>
        <hr />
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
      </Paper>
    </Box>
  );
}
