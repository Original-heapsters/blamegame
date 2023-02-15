import React from 'react';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Player from '../Util/Player';
import styles from './hook.module.css';

const { REACT_APP_API_SERVER, REACT_APP_API_SERVER_LOCAL, REACT_APP_TEST_LOCAL } = process.env;

export default function Hook({
  index,
  id,
  player,
  profileUrl,
  consequence,
  hook,
  audio,
  date,
}) {
  const userImg = profileUrl || 'https://funny-photo.s3.amazonaws.com/templates/1300/preview220.jpg';
  const readableDate = new Date(date).toLocaleString('en-US');
  const apiServer = REACT_APP_TEST_LOCAL === 'true' ? REACT_APP_API_SERVER_LOCAL : REACT_APP_API_SERVER;
  const audioUrl = `${apiServer}${audio}`;
  const hookContent = `${hook}:${consequence.rule} -> ${consequence.cause}`;

  return (
    <Paper key={id} className={index % 2 === 0 ? styles.hookContainer : styles.hookContainerAlt}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            src={userImg}
            variant="rounded"
            alt={player.username}
          />
        </ListItemAvatar>
        <ListItemText
          primary={`${player.username} ${readableDate}`}
          secondary={
            (
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {hookContent}
                </Typography>
                <Player url={audioUrl} />
              </>
            )
          }
        />
      </ListItem>
    </Paper>
  );
}
