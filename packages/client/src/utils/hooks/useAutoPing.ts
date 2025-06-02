import { useState, useEffect } from "react";
import { usePing, type PingItemFromLS } from "./usePing";

export const useAutoPing = () => {
  const { ping } = usePing();
  const [activeIntervals, setActiveIntervals] = useState<number[]>([]);

  const startAutoPinging = (items: PingItemFromLS[]) => {
    stopAutoPinging();

    const newIntervals = items
      .filter((item) => !item.isPaused)
      .map((item) => {
        return setInterval(() => {
          ping(item.url, item.interval, item.tags);
        }, item.interval * 1000);
      });

    setActiveIntervals(newIntervals);
  };

  const stopAutoPinging = () => {
    activeIntervals.forEach((interval) => clearInterval(interval));
    setActiveIntervals([]);
  };

  useEffect(() => {
    return () => stopAutoPinging();
  }, []);

  return { startAutoPinging, stopAutoPinging };
};
