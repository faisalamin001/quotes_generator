/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    API_KEY: process.env.NEXT_PUBLIC_ENV_VARIABLE_OPEN_AI_API_KEY,
  },
};

module.exports = {
  images: {
    domains: ["i.imgur.com", "www.google.com", "media.giphy.com"],
  },
};

const withPWA = require("next-pwa");

module.exports = withPWA({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV === "development",
  skipWaiting: true,
});
