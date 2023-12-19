import {
  ConfirmationResult,
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { Button, errorHandler, Textfield } from "@mva/shared";
import { getIP, login } from "@mva/fetch";
import { app } from "./firebase";
import css from "./Login.module.scss";

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
  }
}

type Props = {};

export const Login = ({}: Props) => {
  const [phonenumber, setPhonenumber] = useState("");
  const [confirmation, setConfirmation] = useState<ConfirmationResult>();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth(app);

  function addCountryCode(phoneNumber: string): string {
    const countryCodeRegex = /^\+\d{2}/;
    if (countryCodeRegex.test(phoneNumber)) {
      return phoneNumber;
    }
    return `+976${phoneNumber}`;
  }
  function cleanNumber(text: string): string {
    const nonNumericRegex = /\D/g;
    return text.replace(nonNumericRegex, "");
  }
  function cleanPhoneNumber(text: string): string {
    const nonNumericRegex = /[^0-9\+\s]/g;
    text = text.replace(nonNumericRegex, "");
    text = text.replace(/\s+/g, " ");
    return text;
  }
  function removeSpaces(text: string): string {
    return text.replace(/\s/g, "");
  }
  async function sendVerification(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      const recaptcha = new RecaptchaVerifier(auth, "sign-in-button", {
        size: "invisible",
        callback: () => {
          console.log("done");
        },
      });
      const number = addCountryCode(removeSpaces(phonenumber));
      const confirmation = await signInWithPhoneNumber(auth, number, recaptcha);
      setConfirmation(confirmation);
      toast.success("Баталгаажуулах код илгээгдлээ.");
    } catch (error: any) {
      toast.error(error);
    }
  }
  async function confirmVerification() {
    if (confirmation) {
      try {
        const result: any = await confirmation.confirm(otp);
        const uuid = uuidv4();
        localStorage.setItem("uuid", uuid);
        const message = await login(result.user.accessToken, { ip: "", uuid });
        toast.success(message);
        window.location.reload();
      } catch (error: any) {
        if (error.message === "Firebase: Error (auth/code-expired).")
          toast.error("Баталгаажуулах кодны хүчинтэй хугацаа дууссан");
        else if (
          error.message === "Firebase: Error (auth/invalid-verification-code)."
        )
          toast.error("Баталгаажуулах код буруу байна");
        else errorHandler(error);
      }
    }
  }

  return (
    <div className={css.container}>
      <form
        className={`${css.wrapper} ${confirmation ? css.wrapper_left : ""}`}
        onSubmit={
          phonenumber.length >= 8 ? sendVerification : (e) => e.preventDefault()
        }
      >
        <h1>Нэвтрэх</h1>
        <Textfield
          placeholder="Утасны дугаар"
          value={phonenumber}
          onChange={(e) => {
            setPhonenumber(cleanPhoneNumber(e));
          }}
        />
        <Button
          id="sign-in-button"
          className={phonenumber.length >= 8 ? undefined : css.disable}
          type="submit"
          onClick={confirmVerification}
        >
          Үргэлжлүүлэх
        </Button>
      </form>
      <div className={`${css.wrapper} ${confirmation ? css.wrapper_left : ""}`}>
        <h1>Нэвтрэх</h1>
        <Textfield
          placeholder="Баталгаажуулах код"
          value={otp}
          onChange={(e) => {
            if (e.length <= 6) {
              setOtp(cleanNumber(e));
            }
          }}
        />
        <Button
          className={otp.length == 6 ? undefined : css.disable}
          onClick={otp.length == 6 ? confirmVerification : undefined}
        >
          Баталгаажуулах
        </Button>
      </div>
    </div>
  );
};
