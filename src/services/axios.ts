//export const PORT = "http://192.168.1.21:3000";
export const PORT = "https://ftp-back.onrender.com";

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: PORT,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;