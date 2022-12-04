import React from 'react';

export default function GameListItem({
  game,
}) {
  return (
    <li>
      {game.name}
    </li>
  );
}
