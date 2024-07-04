import { useRouter } from "next/router";
import Head from "next/head";
import getConfig from "next/config";
import { ThemeProviderComponent } from "@/theme";

import "../styles/globals.css";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
        <title>VICTORIA TRANSFER </title>
        <meta name="robots" content="index,follow" />
      </Head>

      <ThemeProviderComponent>
        <Component
          {...pageProps}
          publicRuntimeConfig={publicRuntimeConfig}
          serverRuntimeConfig={serverRuntimeConfig}
          key={router.asPath}
        />
      </ThemeProviderComponent>
    </>
  );
}

export default MyApp;
