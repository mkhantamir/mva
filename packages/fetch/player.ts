import { Pagination, Player, axios } from "@mva/shared";

export const getAllPlayers = async () => {
  const response = await axios.get("/position");
  return response.data.result as { label: string; icon: string; _id: number }[];
};
export const getPlayersByCategory = async ({
  per_page,
  page,
  sort,
  select,
}: {
  per_page?: number;
  page?: number;
  sort?: string;
  select?: string;
}) => {
  const response = await axios.get(
    `/player?per_page=${per_page ? per_page : 999}${
      page ? `&page=${page}` : ""
    }${sort ? `&sort=${sort} ` : ""}${select ? `&select=${select} ` : ""}`
  );
  return response.data as {
    success: boolean;
    result: Player[];
    count: number;
    pagination: Pagination;
  };
};
