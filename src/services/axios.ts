//export const PORT = "http://192.168.1.21:3000";
export const PORT = "https://ftp-back.onrender.com";

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: PORT,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});


axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/login";
    }
    return error;
  }
);


export default axiosInstance;