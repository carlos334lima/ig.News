import { AppProps } from "next/app";

//@components
import { Header } from "../components/Header";

//@styles
import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
