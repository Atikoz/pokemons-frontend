import { useEffect, useState } from "react"
import Cookies from "js-cookie";


export const useAccessToken = () => {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const token = Cookies.get('accessToken');
    setAccessToken(token || '');
  }, []);

  return [accessToken]
}