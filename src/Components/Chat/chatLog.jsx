import React from 'react';
import ChatMessage from './chatMessage';

export default function ChatLog({ messages }) {
  return (
    <div>
      <ul>
        {
          messages.map((message) => (
            <ChatMessage
              key={message.id}
              player={message.player}
              date={message.date}
              message={message.message}
            />
          ))
        }
      </ul>
    </div>
  );
}
