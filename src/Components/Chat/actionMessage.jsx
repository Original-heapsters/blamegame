import React from 'react';
import Player from '../Util/Player';

const { REACT_APP_API_SERVER } = process.env;

export default function ActionMessage({
  id,
  player,
  date,
  hook,
  consequence,
  audio,
}) {
  const audioUrl = `${REACT_APP_API_SERVER}${audio}`;

  return (
    <li className="ActionMessage" id={id}>
      <div>
        <strong>{player}</strong>
        {date}
      </div>
      <div>
        <p>{hook}</p>
        <p>{consequence.cause}</p>
      </div>
      <div>
        <Player url={audioUrl} />
      </div>
    </li>
  );
}
