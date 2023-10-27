import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Head from "next/head";
import { CookiesProvider, useCookies } from 'react-cookie';
import { useEffect } from "react";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {

    const [cookie,setCookie,removeCookie]=useCookies()
    useEffect(()=>{
        setCookie("direct-entry","3/4")
        setCookie("de-code","KAaX")
        setCookie("playfair-key","roll")
    },[])

  return (
    <CookiesProvider>
    <SessionProvider session={session}>
        <Head>
            <meta name="direct-entry" slot="1/4" content="ZCis"></meta>
            <title>Digital Hunt</title>
          <link
            data-default-icon="https://www.notion.so/image/https%3A%2F%2Fcdn-icons-png.flaticon.com%2F512%2F7922%2F7922150.png?table=block&id=7599f2bc-189b-4f00-bca6-2f5fe0e28925&spaceId=e90b889a-8891-4f8b-b666-2f7c5bc7c2a3&width=250&userId=94908eb9-60b8-46a3-8c7e-aa8f60aeb215&cache=v2"
            rel="icon"
            sizes="192x192"
            href="https://www.notion.so/image/https%3A%2F%2Fcdn-icons-png.flaticon.com%2F512%2F7922%2F7922150.png?table=block&id=7599f2bc-189b-4f00-bca6-2f5fe0e28925&spaceId=e90b889a-8891-4f8b-b666-2f7c5bc7c2a3&width=250&userId=94908eb9-60b8-46a3-8c7e-aa8f60aeb215&cache=v2"
          ></link>
        </Head>
      <Component {...pageProps} />
    </SessionProvider>
    </CookiesProvider>
  );
};

export default api.withTRPC(MyApp);
