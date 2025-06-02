import { useState } from "react";
import axios from "axios";

interface PingResponse {
  host: string;
  alive: boolean;
  output: string;
  time: number;
}

export const usePing = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PingResponse | null>(null);

  const ping = async (ip: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:5000/ping", { ip });
      setData(response.data);

      console.log(response.data)

      if (response.data) {
        alert('Ping created successfully!');
        
        const existingData = localStorage.getItem('data');
        const dataFromLs = existingData ? JSON.parse(existingData) : [];
        
        localStorage.setItem('data', JSON.stringify([...dataFromLs, response.data]));
      }
    } catch (err) {
      console.log(err)
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      alert("Error pinging host")
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { ping, isLoading, error, data };
};
