import React from 'react';

export default function ChatMessage({
  id,
  player,
  date,
  message,
}) {
  return (
    <li className="ChatMessage" id={id}>
      <div>
        <strong>{player}</strong>
        {date}
      </div>
      <div>
        <p>{message}</p>
      </div>
    </li>
  );
}
