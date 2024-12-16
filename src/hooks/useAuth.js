import { useSDK } from "@metamask/sdk-react";
import errorNotify from "../notify/errorNotify";
import { useContext } from "react";
import { AuthContext } from "../context";
import getSignToken from "../api/getSignToken";
import UserService from "../api/UserService";
import Cookies from 'js-cookie';

export const useAuth = () => {
  const { sdk } = useSDK();
  const { setIsAuth } = useContext(AuthContext);

  const connect = async () => {
    try {
      if (!window.ethereum.isMetaMask) {
        return errorNotify('You do not have MetaMask installed!', false);
      }
      const accounts = await sdk.connect();

      const token = await getSignToken();

      if (!token) throw new Error('token is null')

      const signature = await sdk.connectAndSign({ msg: token });

      const loginUser = await UserService.authUser(accounts[0], signature, token);

      if (loginUser.status !== 'ok') return errorNotify(`Error authentication: ${loginUser.message}`);

      if (loginUser?.accessToken) {
        Cookies.set('accessToken', loginUser.accessToken, { expires: 7 });
        localStorage.setItem('auth', 'true')
        setIsAuth(true)
      }
    } catch (error) {
      if (error.code === 4001) return errorNotify('You rejected the request', 5000);

      console.error("failed to connect:", error);
      errorNotify('Unexpected error', 5000)
    }
  }

  return [connect]
}