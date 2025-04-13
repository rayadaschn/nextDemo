import axios from "axios";

// 在跨域的时候携带 cookie
axios.defaults.withCredentials = true;

const request = axios.create({
  baseURL: "http://localhost:3007",
});

export default request;
