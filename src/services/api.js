import axios from "axios";

export const api = axios.create({
  baseURL: "https://chic-caring-production-2e74.up.railway.app/api/v1",
});
