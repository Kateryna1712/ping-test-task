import { useState } from "react";
import type { PingItemFromLS } from "./usePing";

export const usePingPause = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const togglePause = (url: string, isPaused: boolean) => {
    setIsLoading(true);
    setError(null);

    try {
      const existingData = localStorage.getItem('data');
      if (!existingData) {
        throw new Error("No ping data found in localStorage");
      }

      const dataFromLs: PingItemFromLS[] = JSON.parse(existingData);
      const itemIndex = dataFromLs.findIndex(item => item.url === url);

      if (itemIndex === -1) {
        throw new Error(`Ping item with URL ${url} not found`);
      }

      dataFromLs[itemIndex] = {
        ...dataFromLs[itemIndex],
        isPaused
      };

      localStorage.setItem('data', JSON.stringify(dataFromLs));
      return true;
    } catch (err) {
      console.error(err);
      const message = err instanceof Error ? err.message : "Unknown error occurred";
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { togglePause, isLoading, error };
};