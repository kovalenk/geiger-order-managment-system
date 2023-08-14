import axios from "axios";

const baseURL = process.env.VUE_APP_API_URL ? process.env.VUE_APP_API_URL : ``;
const axiosClient = axios.create({
  baseURL,
  headers: {
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, X-Requested-With",
    "Content-Type": "application/json",
  },
});

export default axiosClient;
