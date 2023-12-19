import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

export const ShowSubmitContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>]
>([false, () => {}]);

export const ShowSubmitProvider = ({ children }: { children?: ReactNode }) => {
  const [showSubmit, setShowSubmit] = useState<boolean>(false);
  return (
    <ShowSubmitContext.Provider value={[showSubmit, setShowSubmit]}>
      {children}
    </ShowSubmitContext.Provider>
  );
};
