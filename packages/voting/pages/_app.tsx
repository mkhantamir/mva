import "react-toastify/dist/ReactToastify.css";
import "@mva/styles/globals.scss";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { Container } from "~/views/app";
import { ShowSubmitProvider } from "~/context";
import { VotedPlayersProvider } from "~/context/votedPlayers.context";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="facebook-domain-verification"
          content="5w081l3romobqm03vizofb8tctzodz"
        />
      </Head>
      <ToastContainer
        position="top-right"
        theme="light"
        autoClose={5000}
        pauseOnHover={false}
      />
      <ShowSubmitProvider>
        <VotedPlayersProvider>
          <Container>
            <Component {...pageProps} />
          </Container>
        </VotedPlayersProvider>
      </ShowSubmitProvider>
    </>
  );
}
