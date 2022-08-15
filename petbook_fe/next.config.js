/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

const { useRouter } = require("next/router");
const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

module.exports = {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack } // options
  ) => {
    // config.module.rules.push({
    //   test: /\.mdx/,
    //   use: [
    //     options.defaultLoaders.babel,
    //     {
    //       loader: '@mdx-js/loader',
    //       options: pluginOptions.options,
    //     },
    //   ],
    // })
    return config;
  },
};
