import { Team } from "~/components";
import { Button } from "@mva/shared";
import css from "./Teams.module.scss";
type Props = {};

export const Teams = ({}: Props) => {
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        {[...Array(12)].map(() => (
          <Team />
        ))}
      </div>
      <Button className={css.add}>Баг нэмэх</Button>
    </div>
  );
};
