import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';

export default function PlayerListItem({
  img = 'https://e9g2x6t2.rocketcdn.me/wp-content/uploads/2022/06/linkedin-headshot-photography-examples-5-1.jpg',
  name = 'monica leu',
  isCurrentUser = false,
  isOnline,
}) {
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: isOnline ? '#44b700' : 'grey',
      color: isOnline ? '#44b700' : 'grey',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: isOnline ? 'ripple 1.2s infinite ease-in-out' : '',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));

  return (
    <ListItemButton autoFocus={isCurrentUser}>
      <ListItemAvatar>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
        >
          <Avatar alt={name} src={img} variant="rounded" />
        </StyledBadge>
      </ListItemAvatar>
      <ListItemText primary={name} secondary={isCurrentUser ? '(you)' : ''} sx={{ color: 'secondary.contrastText' }} />
    </ListItemButton>
  );
}
