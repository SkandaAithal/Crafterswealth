import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo-client";
import { AppProvider } from "@/lib/provider/app-provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AppProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </AppProvider>
    </ApolloProvider>
  );
}
