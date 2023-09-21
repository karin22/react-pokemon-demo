import axios from "axios";

export interface Params {
  limit?: number;
}

class API {
  public static get(url: string, params?: Params) {
    const xhr = axios({
      method: "GET",
      url: `/api/${url}`,
      params,
    }).then((res) => res.data);
    return xhr;
  }
}

export default API;
