import { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

export interface PingItemFromLS {
  url: string,
  interval: number,
  lastExecuted: string,
  lastFive: ('P' | 'F')[],
  tags: string[],
  isPaused: boolean
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

  const notify = (value:string) => toast(value);

  const updateLocalStorage = (ip: string, interval: number, tags: string[], status: 'P' | 'F', isPaused: boolean) => {
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
        tags,
        isPaused
      };
    } else {
      dataFromLs.push({
        url: ip,
        interval,
        tags,
        lastFive: [status],
        lastExecuted: now,
        isPaused
      });
    }
    
    setData(dataFromLs);
    localStorage.setItem('data', JSON.stringify(dataFromLs));
  };

  const ping = async (ip: string, interval: number, tags: string[]) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ping`, { ip });
      if (response.data) {
        console.log('Ping created successfully!');
        notify(`Ping for url ${ip} created successfully!`)
        updateLocalStorage(ip, interval, tags, 'P', false);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      notify(`Error pinging host ${ip}`)
      updateLocalStorage(ip, interval, tags, 'F', false);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { ping, isLoading, error, data };
};