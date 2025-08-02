import { NextFederationPlugin } from '@module-federation/nextjs-mf';
import { name, filename, exposes, remotes, shared } from './module-federation.config.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer }) {
    
      config.plugins.push(
        new NextFederationPlugin({
          name,
          filename,
          exposes: {
            './useCart': './shared/hooks/useCart.ts',
            './store': './shared/store/index.ts',
            ...exposes,
          },
          remotes: remotes(isServer),
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
            ...shared,
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