import React from 'react';
import ChatMessage from './chatMessage';
import ActionMessage from './actionMessage';

export default function ChatLog({ messages }) {
  return (
    <div>
      <ul>
        {
          messages.map((message) => (message.type === 'hook'
            ? (
              <ActionMessage
                key={message.id}
                player={message.player}
                date={message.date}
                message={message.message}
                consequence={message.consequence}
                hook={message.hook}
                audio={message.publicAudio}
              />
            )
            : (
              <ChatMessage
                key={message.id}
                player={message.player}
                date={message.date}
                message={message.message}
              />
            )))
        }
      </ul>
    </div>
  );
}
