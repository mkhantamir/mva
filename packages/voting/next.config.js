/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  transpilePackages: [
    "@mva/assets",
    "@mva/fetch",
    "@mva/shared",
    "@mva/styles",
  ],
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `
    @import "@mva/styles/responsive.scss";
    @import "@mva/styles/variables.scss";
    `,
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    domains: ["mesa.b-cdn.net", "localhost"],
  },
};
module.exports = nextConfig;
