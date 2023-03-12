import React from 'react';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
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
      <Grid
        container
        className={index % 2 === 0 ? styles.commentContainer : styles.commentContainerAlt}
      >
        <Grid container xs={12}>
          <Grid item xs={3} md={1}>
            <Avatar
              src={userImg}
              variant="rounded"
              alt={player.username}
            />
            <Typography
              variant="h7"
              color="text.primary"
            >
              {`${player}`}
            </Typography>
          </Grid>
          <Grid item xs={9} md={11}>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {message}
            </Typography>
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Typography
            variant="caption"
            color="text.secondary"
          >
            {readableDate}
          </Typography>
        </Grid>
      </Grid>
    </ListItem>
  );
}
