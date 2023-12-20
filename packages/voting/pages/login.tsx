import Image from "next/image";
import background from "@mva/assets/login.jpg";
import css from "~/styles/login.module.scss";
import { Login } from "~/views/app";
import { useEffect } from "react";
import { useRouter } from "next/router";

type Props = {};

const LoginPage = ({}: Props) => {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  }, []);
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
