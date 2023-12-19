import { axios } from "@mva/shared";

export const checkVoted = async () => {
  const response = await axios.get("/user");
  return response.data.result as { male: boolean; female: boolean };
};
export const vote = async (
  players: { position_id: number; player_id: number }[],
  gender: "female" | "male"
) => {
  const response = await axios.post("/vote", { players, gender });
  return response.data.result;
};
export const uploadImage = async ({
  label,
  base64,
}: {
  label: string;
  base64: string;
}) => {
  const response = await axios.post("/share", { label, image: base64 });
  return response.data.result;
};
export const checkImage = async (label: string) => {
  const response = await axios.put("/share", { label });
  return response.data.result as boolean;
};
export const getMyVotes = async () => {
  const response = await axios.get("/vote/my");
  return response.data.result as any;
};
