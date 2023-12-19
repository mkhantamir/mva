import "react-toastify/dist/ReactToastify.css";
import "@mva/styles/globals.scss";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { Container } from "~/views/app";
import { ShowSubmitProvider } from "~/context";
import { VotedPlayersProvider } from "~/context/votedPlayers.context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
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
