import React from 'react';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
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
  // const hookContent = `${hook}: ${consequence.rule}`;
  // const hookValue = `${consequence.points} Points`;

  return (
    <ListItem key={id} alignItems="flex-start">
      <Grid
        container
        className={index % 2 === 0 ? styles.hookContainer : styles.hookContainerAlt}
      >
        <Grid container xs={12}>
          <Grid xs={3} md={1}>
            <Avatar
              src={userImg}
              variant="rounded"
              alt={player.username}
            />
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {player.username}
            </Typography>
            <ListItemText
              primary={player.username}
            />
          </Grid>
          <Grid xs={9} md={11}>
            <Grid container xs={12}>
              <Typography
                xs={1}
                variant="body2"
                color="text.primary"
              >
                {hook}
              </Typography>
              <Typography
                xs={1}
                variant="body2"
                color="text.primary"
              >
                {consequence.rule}
              </Typography>
              <Typography
                xs={10}
                variant="body2"
                color="text.primary"
              >
                {consequence.cause}
              </Typography>
              <Player url={audioUrl} />
            </Grid>
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
