import App from "next/app";
import { useRouter } from "next/router";
import Head from "next/head";
import getConfig from "next/config";
import { ThemeProviderComponent } from "@/theme";
import { fetchFooterNavigation, fetchMainNavigaiton, fetchPages} from "../service"

import "../styles/globals.css";
import { Layout } from "components";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

function CustomApp({ Component, pageProps, globalProps }) {
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
        <Layout globalProps={globalProps}>
          <Component
            pageProps={{...pageProps, ...globalProps}}
            publicRuntimeConfig={publicRuntimeConfig}
            serverRuntimeConfig={serverRuntimeConfig}
            key={router.asPath}
          />
        </Layout>
      </ThemeProviderComponent>
    </>
  );
}

CustomApp.getInitialProps = async (ctx) => {
  const appProps = await App.getInitialProps(ctx)
  const mainNavigation = await fetchMainNavigaiton(ctx?.ctx?.locale)
  const pages = await fetchPages(ctx?.ctx?.locale)
  const footerNavigation = await fetchFooterNavigation(ctx?.ctx?.locale)
  return {
    ...appProps,
    globalProps: {
      pages,
      mainNavigation,
      footerNavigation
    }
  }
}

export default CustomApp;
