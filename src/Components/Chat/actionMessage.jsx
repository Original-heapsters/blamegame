import React from 'react';
import Card from 'react-bootstrap/Card';
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
  const userImg = null || 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp';
  const readableDate = new Date(date).toLocaleString('en-US');
  const audioUrl = `${REACT_APP_API_SERVER}${audio}`;

  return (
    <Card className="chatMessage" key={id} style={{ width: '10rem' }}>
      <Card.Img variant="left" src={userImg} />
      <Card.Header>{hook}</Card.Header>
      <Card.Body>
        <Card.Title>{player}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{readableDate}</Card.Subtitle>
        <Card.Text>{consequence.cause}</Card.Text>
        <Player url={audioUrl} />
      </Card.Body>
    </Card>
  );
}
