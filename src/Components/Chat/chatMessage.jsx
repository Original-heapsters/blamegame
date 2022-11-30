import React from 'react';
import Card from 'react-bootstrap/Card';

export default function ChatMessage({
  id,
  player,
  date,
  message,
}) {
  const userImg = null || 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp';
  const readableDate = new Date(date).toLocaleString('en-US');
  return (
    <Card className="chatMessage" key={id} style={{ width: '10rem' }}>
      <Card.Img variant="left" src={userImg} />
      <Card.Body>
        <Card.Title>{player}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{readableDate}</Card.Subtitle>
        <Card.Text>{message}</Card.Text>
      </Card.Body>
    </Card>
  );
}
