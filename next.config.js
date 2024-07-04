/** @type {import('next').NextConfig} */

module.exports = {
  i18n: {
    locales: ["en", "tr"],
    defaultLocale: "tr",
  },
};

const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: false,
  swcMinify: true,
  output: "export",
  images: {
    domains: ["127.0.0.1", "localhost", "cms.focusteam.top"],
  },

  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  experimental: {
    jsconfigPaths: true,
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
