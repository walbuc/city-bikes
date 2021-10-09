import axios from "axios";
import keys from "../config/keys";

const apiURL = keys.bikesApiUrl;

module.exports = function factoryClient() {
  return async function client(
    endpoint,
    { data, token, headers: customHeaders, ...customConfig } = {}
  ) {
    const config = {
      url: endpoint,
      baseURL: apiURL,
      method: data ? "POST" : "GET",
      data: data ? JSON.stringify(data) : undefined,
      headers: {
        // Authorization: token ? `Bearer ${token}` : null,
        //"Content-Type": data ? "application/json" : undefined,
        ...customHeaders,
      },
      ...customConfig,
    };

    return axios(config).then(
      async (response) => {
        console.log("AXIOS");
        console.log(response.data, "???? DATA @");

        return response.data;
      },
      (err) => {
        console.log(err);
        return Promise.reject(err);
      }
    );
  };
};
