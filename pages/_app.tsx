import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { Toaster } from "react-hot-toast";
import { useState, createContext, useMemo } from "react";

export const SearchContext = createContext<any>([[], () => null]);
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [search, setSearch] = useState("");
  const value = useMemo(() => ({ search, setSearch }), [search]);
  return (
    <SessionProvider session={session}>
      <SearchContext.Provider value={value}>
        <Layout>
          <Component {...pageProps} />
          <Toaster />
        </Layout>
      </SearchContext.Provider>
    </SessionProvider>
  );
}

export default MyApp;
