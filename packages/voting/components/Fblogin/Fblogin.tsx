import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import fb from "@mva/assets/facebook.svg";
import css from "./Fblogin.module.scss";
import { v4 as uuidv4 } from "uuid";
import { login } from "@mva/fetch";
import Image from "next/image";
import { ReactFacebookLoginInfo } from "react-facebook-login";
import { toast } from "react-toastify";
import { errorHandler } from "@mva/shared";
type Props = {};

export const Fblogin = ({}: Props) => {
  const handleLogin = async (e: ReactFacebookLoginInfo) => {
    try {
      let uuid = localStorage.getItem("uuid");
      if (!uuid) {
        uuid = uuidv4();
        localStorage.setItem("uuid", uuid);
      }
      const message = await login(e.accessToken, { ip: "", uuid });

      toast.success(message);
      window.location.reload();
    } catch (error) {
      errorHandler(error);
    }
  };
  try {
    return (
      <FacebookLogin
        appId="763160141791513"
        callback={handleLogin}
        render={(renderProps) => (
          <button onClick={renderProps.onClick} className={css.base}>
            <Image src={fb} alt="FB-ээр нэвтрэх" />
            <p>Facebook</p>
          </button>
        )}
      />
    );
  } catch (error) {
    console.log(error);
    return null;
  }
};
