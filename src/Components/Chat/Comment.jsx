import React from 'react';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import styles from './comment.module.css';

export default function Comment({
  index,
  id,
  player,
  profileUrl,
  date,
  message,
}) {
  const userImg = profileUrl || 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp';
  const readableDate = new Date(date).toLocaleString('en-US');

  return (
    <ListItem key={id} alignItems="flex-start">
      <Paper
        className={index % 2 === 0 ? styles.commentContainer : styles.commentContainerAlt}
      >
        <ListItemAvatar>
          <Avatar
            src={userImg}
            variant="rounded"
            alt={player.username}
          />
        </ListItemAvatar>
        <ListItemText
          primary={`${player} ${readableDate}`}
          secondary={
            (
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {message}
              </Typography>
            )
          }
        />
      </Paper>
    </ListItem>
  );
}
