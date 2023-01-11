import React from 'react';
import Button from 'react-bootstrap/Button';
import styles from './gameListItem.module.css';

export default function GameListItem({
  game,
  isCurrentGame = false,
  switchRooms,
}) {
  const buttonStyle = isCurrentGame ? 'light' : 'outline-light';

  return (
    <li>
      <Button
        className={styles.gameListItem}
        variant={buttonStyle}
      >
        {game.name}
      </Button>
    </li>
  );
}
