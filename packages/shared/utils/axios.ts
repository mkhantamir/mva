import default_axios from "axios";

export const axios = default_axios.create({
  baseURL: "http://localhost:3276/api",
  withCredentials: true,
});
