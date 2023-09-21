import type { AppProps } from "next/app";
import Layout from "../app/layout";
import { ColorProvider } from "@/contexts/ColorContext";
import { UserContext, UserProvider } from "@/contexts/UserContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ColorProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ColorProvider>
    </UserProvider>
  );
}
