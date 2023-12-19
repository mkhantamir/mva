const path = require("path");

module.exports = {
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `
      @import "@mva/styles/variables.scss";
      @import "@mva/styles/responsive.scss";
    `,
  },
  transpilePackages: ["@mva/assets", "@mva/styles", "@mva/fetch"],
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};
