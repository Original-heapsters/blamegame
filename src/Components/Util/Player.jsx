import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import StopIcon from '@mui/icons-material/Stop';

const useAudio = (url) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    if (playing) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [playing, audio]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  });

  return [playing, toggle];
};

function Player({ url }) {
  const [playing, toggle] = useAudio(url);

  return (
    <IconButton color="secondary" onClick={toggle} sx={{ height: '80px', width: '80px' }}>
      {playing ? <StopIcon /> : <MusicNoteIcon />}
    </IconButton>
  );
}

export default Player;
