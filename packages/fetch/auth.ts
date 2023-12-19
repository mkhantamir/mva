import { axios } from "@mva/shared";

export const login = async (
  auth: string,
  data: { ip: string; uuid: string }
) => {
  const response = await axios.post("/auth", data, {
    headers: { Authorization: auth },
  });
  return response.data.message as string;
};
export const getIP = async () => {
  const response = await axios.get("https://api.hostip.info/get_html.php");

  return response;
};
export const status = async () => {
  const response = await axios.get("/auth");
  return response.data as { success: boolean; result: boolean; id?: number };
};
export const logout = async () => {
  const response = await axios.post("/auth/logout");
  return response.data.message as string;
};
