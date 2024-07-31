/** @type {import('next').NextConfig} */

const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["127.0.0.1", "localhost", "cdn.sanity.io"],
  },
  i18n: {
    locales: ["en", "de"],
    defaultLocale: "en",
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  webpack: (config) => {
    config.resolve.alias["@"] = __dirname;

    config.module.rules.push({
      test: /\.svg?$/,
      oneOf: [
        {
          use: [
            {
              loader: "@svgr/webpack",
              options: {
                prettier: false,
                titleProp: true,
              },
            },
          ],
          issuer: {
            and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
