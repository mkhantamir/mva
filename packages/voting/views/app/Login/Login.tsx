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
import { Fblogin } from "~/components";

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

  return (
    <div className={css.container}>
      <div className={`${css.wrapper} ${confirmation ? css.wrapper_left : ""}`}>
        <h1>Нэвтрэх</h1>
        <Fblogin />
        {/* <Textfield
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
        </Button> */}
      </div>
      {/* <div className={`${css.wrapper} ${confirmation ? css.wrapper_left : ""}`}>
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
      </div> */}
    </div>
  );
};
