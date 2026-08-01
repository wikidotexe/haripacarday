import { useCallback, useEffect, useRef, useState } from 'react';

const TRACK_SRC = '/song/ran.mp3';
const VOLUME = 0.45;

export function useAmbientMusic() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stop = useCallback(() => {
    audioRef.current?.pause();
    setPlaying(false);
  }, []);

  const start = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio(TRACK_SRC);
      audio.loop = true;
      audio.preload = 'auto';
      audio.volume = VOLUME;
      audioRef.current = audio;
    }

    void audioRef.current.play().then(
      () => setPlaying(true),
      () => setPlaying(false),
    );
  }, []);

  const toggle = useCallback(() => {
    if (playing) stop();
    else start();
  }, [playing, start, stop]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  return { playing, toggle };
}
