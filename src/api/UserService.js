/* eslint-disable import/no-anonymous-default-export */
import { DOMAIN_API } from "../config.js";
import errorNotify from "../notify/errorNotify.js";

class UserService {
  getHistoryBattleUser = async (accessToken) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    const response = await fetch(`${DOMAIN_API}/api/user/getHistoryBattle`, requestOptions);
    const resultApi = await response.json();

    return resultApi
  }

  authUser = async (address, signature, token) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
  
      const raw = JSON.stringify({
        "address": address,
        "token": token,
        "signature": signature
      });
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
  
      const url = `${DOMAIN_API}/api/auth/login`;
  
      const response = await fetch(url, requestOptions);
  
      const resultApi = await response.json();
  
      return resultApi
    } catch (error) {
      console.error(`error login user: ${error.message}`);
      errorNotify('Unexpected error server', 5000);
    }
  }
}

export default new UserService()