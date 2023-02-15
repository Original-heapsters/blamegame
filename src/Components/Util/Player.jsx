import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

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
    <Button variant="outline-primary" onClick={toggle}>
      {playing ? 'Pause' : 'Play'}
    </Button>
  );
}

export default Player;
