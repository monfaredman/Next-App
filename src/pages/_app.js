import Head from "next/head";
import Layout from "../components/layout/layout";
import { SessionProvider } from "next-auth/react";
import { NotificationContextProvider } from "@/store/notification-context";
import "@/styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <NotificationContextProvider>
        <Layout>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1.0,width=device-width"
            />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </NotificationContextProvider>
    </SessionProvider>
  );
}
