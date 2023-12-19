import { Team, axios } from "@mva/shared";

export const getAllTeams = async () => {
  const response = await axios.get("/team");
  return response.data.result as Team[];
};
