import { useState, useEffect } from "react";

export interface PingItemFromLS {
  url: string,
  interval: number,
  lastExecuted: string,
  lastFive: ('P' | 'F')[],
  tags: string[]
}

export const useGetPingsList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PingItemFromLS[] | []>([]);

  const getPings = () => {
    setIsLoading(true);
    setError(null);

    try {
      const existingData = localStorage.getItem('data');
      const dataFromLs: PingItemFromLS[] = existingData ? JSON.parse(existingData) : [];
      setData(dataFromLs);
      return dataFromLs;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error reading pings from localStorage";
      setError(message);
      console.error("Error getting pings:", err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPings();
  }, []);

  return { getPings, isLoading, error, data };
};