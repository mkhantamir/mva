import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

export const GenderContext = createContext<
  ["female" | "male" | null, Dispatch<SetStateAction<"female" | "male" | null>>]
>([null, () => {}]);

export const GenderProvider = ({ children }: { children?: ReactNode }) => {
  const [gender, setGender] = useState<"female" | "male" | null>(null);
  return (
    <GenderContext.Provider value={[gender, setGender]}>
      {children}
    </GenderContext.Provider>
  );
};
