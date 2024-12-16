import { useEffect, useState } from "react";

export const useWebSocket = (url) => {
  const [ws, setWs] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const socket = new WebSocket(url);
    socket.onopen = () => {
      console.log('WebSocket Connected');
      setIsConnected(true);
    };

    socket.onclose = (event) => {
      console.log('WebSocket Disconnected', event);
      setIsConnected(false);
    };

    socket.onerror = (err) => {
      console.error('WebSocket Error:', err);
      setError(err);
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [url]);

  return [ ws, isConnected, error ];
}