import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function GameListItem({
  game,
  isCurrentGame = false,
  switchRooms,
}) {
  const clickHandler = () => {
    switchRooms(game);
  };

  return (
    <ListItemButton
      selected={isCurrentGame}
      onClick={clickHandler}
    >
      <ListItemText primary={game.name} sx={{ color: 'secondary.contrastText' }} />
    </ListItemButton>
  );
}
