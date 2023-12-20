import default_axios from "axios";

export const axios = default_axios.create({
  baseURL: "https://volleyball.ave.mn/api",
  withCredentials: true,
});
