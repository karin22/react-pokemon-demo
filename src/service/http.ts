import axios from "axios";

export interface Params {
  limit?: number;
}

class API {
  public static get(url: string, params?: Params) {
    axios.defaults.baseURL = "https://pokeapi.co/api/v2";
    const xhr = axios({
      method: "GET",
      url: `${url}`,
      params,
    }).then((res) => res.data);
    return xhr;
  }
}

export default API;
