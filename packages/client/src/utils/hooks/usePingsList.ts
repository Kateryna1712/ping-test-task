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

  const deletePing = (url: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const existingData = localStorage.getItem('data');
      if (!existingData) {
        throw new Error("No ping data found in localStorage");
      }

      const dataFromLs: PingItemFromLS[] = JSON.parse(existingData);
      const updatedData = dataFromLs.filter(item => item.url !== url);

      localStorage.setItem('data', JSON.stringify(updatedData));
      setData(updatedData);
      return true;
    } catch (err) {
      console.error(err);
      const message = err instanceof Error ? err.message : "Unknown error occurred while deleting ping";
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPings();
  }, []);

  return { getPings, deletePing, isLoading, error, data };
};