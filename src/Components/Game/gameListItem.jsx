import React from 'react';
import Button from 'react-bootstrap/Button';
import styles from './gameListItem.module.css';

export default function GameListItem({
  game,
  isCurrentGame = false,
  switchRooms,
}) {
  const buttonStyle = isCurrentGame ? 'light' : 'outline-light';
  const clickHandler = () => {
    switchRooms(game);
  };

  return (
    <li>
      <Button
        className={isCurrentGame ? styles.gameListItemActive : styles.gameListItem}
        variant={buttonStyle}
        onClick={clickHandler}
      >
        {game.name}
      </Button>
    </li>
  );
}
