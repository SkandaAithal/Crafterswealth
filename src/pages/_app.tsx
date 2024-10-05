import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo-client";
import { AppProvider } from "@/lib/provider/app-provider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import VerifyEmail from "@/components/auth/VerifyEmail";
import ProtectedRoute from "@/lib/provider/protected-route";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <AppProvider>
          <Header />
          <ProtectedRoute>
            <Component {...pageProps} />
            <Footer />
          </ProtectedRoute>
          <VerifyEmail />
          <Toaster />
        </AppProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}
