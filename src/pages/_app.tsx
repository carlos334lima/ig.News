import { AppProps } from "next/app";

//@components
import { Header } from "../components/Header";
import { Provider as NextAuthProvider } from "next-auth/client";

//@styles
import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
    </NextAuthProvider>
  );
}

export default MyApp;
