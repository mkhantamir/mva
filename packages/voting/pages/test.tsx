import Image from "next/image";
import background from "@mva/assets/login.jpg";
import css from "~/styles/login.module.scss";
import { Login } from "~/views/app";
import Head from "next/head";
import { useEffect } from "react";

declare global {
  interface Window {
    FB: any;
  }
}

type Props = {};

const TextPage = ({}: Props) => {
  const urlInstagram = `instagram://story?backgroundImage=https://mesa.b-cdn.net/volleyball/2023/temp/insta-story-temp.png`;
  return (
    <div>
      <Head>
        <script
          async
          defer
          crossOrigin="anonymous"
          src="https://connect.facebook.net/en_US/sdk.js"
        ></script>
      </Head>
      <button
        onClick={() => {
          window.open(
            "http://www.facebook.com/sharer.php?u=" +
              encodeURIComponent(
                "https://mesa.b-cdn.net/volleyball/2023/temp/insta-story-temp.png"
              ),
            "sharer",
            "toolbar=0,status=0,width=626,height=436"
          );
        }}
      >
        share
      </button>
    </div>
  );
};

export default TextPage;
