import { useEffect, useState } from 'react';

export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isToday: boolean;
};

/** Hari Pacar Sedunia dirayakan setiap 1 Agustus. */
function nextTargetDate(now: Date): { target: Date; isToday: boolean } {
  const year = now.getFullYear();
  const thisYear = new Date(year, 7, 1, 0, 0, 0, 0);
  const endOfDay = new Date(year, 7, 1, 23, 59, 59, 999);

  if (now >= thisYear && now <= endOfDay) {
    return { target: thisYear, isToday: true };
  }
  if (now < thisYear) {
    return { target: thisYear, isToday: false };
  }
  return { target: new Date(year + 1, 7, 1, 0, 0, 0, 0), isToday: false };
}

function compute(): TimeLeft {
  const now = new Date();
  const { target, isToday } = nextTargetDate(now);
  const diff = Math.max(0, target.getTime() - now.getTime());

  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isToday,
  };
}

export function useCountdown(): TimeLeft {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(compute);

  useEffect(() => {
    const id = window.setInterval(() => setTimeLeft(compute()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return timeLeft;
}
