import { DOMAIN_API } from "../config";

async function getAllPokemons(accessToken, { limit = 10, page = 1 } = {}) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };
    const responce = await fetch(`${DOMAIN_API}/api/data/getPokemons?page=${page}&limit=${limit}`, requestOptions);
    const resultApi = await responce.json();

    return resultApi
}

export default getAllPokemons