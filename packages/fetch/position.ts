import { axios } from "@mva/shared";

export const getAllPositions = async () => {
  const response = await axios.get("/position");
  return response.data.result as { label: string; icon: string; _id: number }[];
};
