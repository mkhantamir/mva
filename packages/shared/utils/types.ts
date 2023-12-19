import { ReactNode } from "react";

export type Player = {
  _id: number;
  firstname: string;
  lastname: string;
  firstname_eng: string;
  lastname_eng: string;
  number: number;
  avatar: string;
  sex: string;
  position_id: number;
  category_id: number;
  is_legioner: boolean;
  team_id: number;
};
export type Pagination = {
  current_page: number;
  total_page: number;
  start_index: number;
  end_index: number;
};
export type Team = {
  _id: number;
  name: string;
  name_eng: string;
  shortname: string;
  logo: string;
  type: "female" | "male";
  createdAt: string;
};
export type Position = {
  icon: string;
  _id: number;
};
export type Option = {
  label: ReactNode;
  value: string | number;
};
