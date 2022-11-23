import React, { useState, useEffect } from 'react';

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
    <div>
      <button type="button" onClick={toggle}>{playing ? 'Pause' : 'Play'}</button>
    </div>
  );
}

export default Player;
