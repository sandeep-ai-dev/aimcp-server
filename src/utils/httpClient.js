import axios from "axios";

export const httpClient = axios.create({
  timeout: 10000,
});

httpClient.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("HTTP Error:", err.message);
    throw err;
  }
);
