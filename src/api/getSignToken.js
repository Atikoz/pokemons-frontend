import { DOMAIN_API } from "../config";
import errorNotify from "../notify/errorNotify";

async function getSignToken() {
  try {
    const url = `${DOMAIN_API}/api/auth/nonce`;
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    const response = await fetch(url, requestOptions);

    const resultApi = await response.json();

    return resultApi.nonce
  } catch (error) {
    console.error(`error create user token: ${error.message}`);
    errorNotify('Error generation token', 5000);
    return null
  }
}

export default getSignToken