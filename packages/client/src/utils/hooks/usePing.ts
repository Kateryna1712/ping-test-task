import { useState } from "react";
import axios from "axios";

export interface PingItemFromLS {
  url: string,
  interval: number,
  lastExecuted: string,
  lastFive: ('P' | 'F')[],
  tags: string[]
}

const updateLastFive = (lastFive: ('P' | 'F')[], newResult: 'P' | 'F'): ('P' | 'F')[] => {
  if (lastFive.length >= 5) {
    return [...lastFive.slice(1), newResult];
  } else {
    return [...lastFive, newResult];
  }
};

export const usePing = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PingItemFromLS[] | []>([]);

  const updateLocalStorage = (ip: string, interval: number, tags: string[], status: 'P' | 'F') => {
    const existingData = localStorage.getItem('data');
    const dataFromLs: PingItemFromLS[] = existingData ? JSON.parse(existingData) : [];
    const existingItemIndex = dataFromLs.findIndex(item => item.url === ip);
    const now = new Date().toLocaleString();

    if (existingItemIndex >= 0) {
      const existingItem = dataFromLs[existingItemIndex];
      const updatedLastFive = updateLastFive(existingItem.lastFive, status);
      
      dataFromLs[existingItemIndex] = {
        ...existingItem,
        lastFive: updatedLastFive,
        lastExecuted: now,
        interval, 
        tags
      };
    } else {
      dataFromLs.push({
        url: ip,
        interval,
        tags,
        lastFive: [status],
        lastExecuted: now
      });
    }
    
    setData(dataFromLs);
    localStorage.setItem('data', JSON.stringify(dataFromLs));
  };

  const ping = async (ip: string, interval: number, tags: string[]) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:5000/ping", { ip });

      if (response.data) {
        alert('Ping created successfully!');
        updateLocalStorage(ip, interval, tags, 'P');
      }
    } catch (err) {
      console.log(err);
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      alert("Error pinging host");
      updateLocalStorage(ip, interval, tags, 'F');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { ping, isLoading, error, data };
};