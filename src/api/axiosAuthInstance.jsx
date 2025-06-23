import axios from "axios";
const userToken = localStorage.getItem("userToken");

const axiosAuth = axios.create({
  baseURL: import.meta.env.VITE_BURL,
  headers: {
    Authorization: `Bearer ${userToken}`,
  },
});

export default axiosAuth;