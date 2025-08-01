import { AppProps } from "next/app";
import Layout from "./layout";
import ClientProvider from "../components/ClientProvider";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClientProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ClientProvider>
  );
}
