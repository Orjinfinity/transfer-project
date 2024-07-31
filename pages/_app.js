import App from "next/app";
import { useRouter } from "next/router";
import Head from "next/head";
import getConfig from "next/config";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProviderComponent } from "@/theme";

import "../styles/globals.css";
import { Layout } from "components";
import { getLocaleStatic } from "service";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

function CustomApp({ Component, pageProps, globalProps, locale }) {
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
        <NextIntlClientProvider
          locale={locale}
          timeZone="Europe/Istanbul"
          messages={globalProps.messages}
        >
          <Layout globalProps={globalProps} locale={locale}>
            <Component
              pageProps={{ ...pageProps, ...globalProps }}
              publicRuntimeConfig={publicRuntimeConfig}
              serverRuntimeConfig={serverRuntimeConfig}
              key={router.asPath}
            />
          </Layout>
        </NextIntlClientProvider>
      </ThemeProviderComponent>
    </>
  );
}

CustomApp.getInitialProps = async (ctx) => {
  const locale = ctx?.router?.locale || 'en'

  const [appProps, messages] = await Promise.all([App.getInitialProps(ctx), getLocaleStatic(locale)]);

  return {
    ...appProps,
    locale,
    globalProps: {
      messages,
      locale,
    },
  };
};

export default CustomApp;
