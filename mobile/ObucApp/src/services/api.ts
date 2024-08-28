import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.17:3000/api/v1",
});

export { api };