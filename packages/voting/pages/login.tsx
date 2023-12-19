import Image from "next/image";
import background from "@mva/assets/login.jpg";
import css from "~/styles/login.module.scss";
import { Login } from "~/views/app";

type Props = {};

const LoginPage = ({}: Props) => {
  return (
    <div>
      <Image
        className={css.image}
        src={background}
        alt="MVA - ALL STAR - LOGIN"
      />
      <Login />
    </div>
  );
};

export default LoginPage;
