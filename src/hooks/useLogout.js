import { useContext } from "react";
import Cookies from 'js-cookie';
import { AuthContext } from '../context';

export const useLogout = () => {
  const { setIsAuth } = useContext(AuthContext);

  const logout = () => {
    Cookies.remove('accessToken');
    localStorage.setItem('auth', 'false');
    setIsAuth(false);
  };

  return [ logout ];
}