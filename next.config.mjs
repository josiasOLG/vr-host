import { NextFederationPlugin } from '@module-federation/nextjs-mf';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    
      config.plugins.push(
        new NextFederationPlugin({
          name: 'host',
          filename: 'static/chunks/remoteEntry.js',
          exposes: {
            './useCart': './shared/hooks/useCart.ts',
            './store': './shared/store/index.ts',
          },
          remotes: {
            header: `header@http://localhost:3001/_next/static/chunks/remoteEntry.js`,
            footer: `footer@http://localhost:3002/_next/static/chunks/remoteEntry.js`,
            card: `card@http://localhost:3003/_next/static/chunks/remoteEntry.js`,
          },
          shared: {
            react: { 
              singleton: true, 
              eager: true,
              requiredVersion: "^18.3.1"
            },
            "react-dom": { 
              singleton: true, 
              eager: true,
              requiredVersion: "^18.3.1"
            },
            "@reduxjs/toolkit": { 
              singleton: true, 
              eager: true,
              requiredVersion: "^2.2.7"
            },
            "react-redux": { 
              singleton: true, 
              eager: true,
              requiredVersion: "^9.1.2"
            },
          },
          extraOptions: {
            exposePages: true,
            debug: true,
          },
        })
      );

    return config;
  },
};

export default nextConfig;