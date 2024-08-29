import axios from "axios";
import {API_URL} from "@env"

const api = axios.create({
  baseURL: `${API_URL}/api/v1`,
});

export { api };