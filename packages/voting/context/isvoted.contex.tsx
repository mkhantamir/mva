import { createContext } from "react";

export const IsVotesContext = createContext<{ male: boolean; female: boolean }>(
  { male: false, female: false }
);
