import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="tr">
        <Head>
          {/* Meta Etiketleri */}
          <meta name="title" content="VICTORIA TRANSFER" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />

          {/* Anahtar Kelimeler */}
          <meta
            name="keywords"
            content="VICTORIA TRANSFER"
          />

          {/* Open Graph Meta Verileri */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.victoriatransfers.com/" />
          <meta property="og:title" content="VICTORIA TRANSFER " />
          <meta
            property="og:description"
            content="VICTORIA TRANSFER"
          />
          <meta property="og:image" content="/logo.png" />

          {/* Twitter Meta Verileri */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://www.victoriatransfers.com/" />
          <meta property="twitter:title" content="VICTORIA TRANSFER " />
          <meta
            property="twitter:description"
            content="VICTORIA TRANSFER   ve ürünleri konusunda teknolojinin son gelişmelerini takip ederek robot ve otomasyon sistemlerine dayalı üretimi, tecrübeli kadrosu ve müşteri beklentilerine odaklı hizmet anlayışı ile faaliyetlerini sürdürmektedir."
          />
          <meta property="twitter:image" content="/logo.png" />

          {/* Google Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@100;200;300;400;500;600;700;800;900&family=Open+Sans:wght@300;400;500;600;700;800&family=Roboto:wght@100;300;400;500;700;900&display=swap"
            rel="stylesheet"
          />

          {/* Favicon ve Diğer Bağlantılar */}
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/android-icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        </Head>
        <body>
          {/* Google Tag Manager */}
          <Script id="google-tag" strategy="afterInteractive">
            {`
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KM8N45P4');
        `}
          </Script>

          {/* NextScript ve Portal */}
          <NextScript />
          <div id="portal" />
        </body>
      </Html>
    );
  }
}
