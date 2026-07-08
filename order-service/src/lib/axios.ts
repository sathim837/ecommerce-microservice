import axios from "axios";

export const http = axios.create({
//   baseURL: process.env.USER_SERVICE_URL || "http://localhost:3001",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
