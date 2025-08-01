import { NextFederationPlugin } from "@module-federation/nextjs-mf";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "shell",
        filename: "static/chunks/remoteEntry.js",
        remotes: {
          header: `header@http://localhost:3001/_next/static/chunks/remoteEntry.js`,
          footer: `footer@http://localhost:3001/_next/static/chunks/remoteEntry.js`,
          cards: `cards@http://localhost:3001/_next/static/chunks/remoteEntry.js`,
        },
        shared: {
          redux: { singleton: true, eager: true },
          "react-redux": { singleton: true, eager: true },
        },
        extraOptions: {
          exposePages: true,
        },
      })
    );
    return config;
  },
};

export default nextConfig;
