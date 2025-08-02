export const name = process.env.MF_NAME || 'host';

export const filename = 'static/chunks/remoteEntry.js';

export const exposes = {

};

export const remotes = (isServer) => ({
  card: `card@${process.env.CARD_URL || 'http://localhost:3003'}/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
  header: `header@${process.env.HEADER_URL || 'http://localhost:3001'}/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
  footer: `footer@${process.env.FOOTER_URL || 'http://localhost:3002'}/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`
});

export const shared = {
  react: {
    singleton: true,
    requiredVersion: false,
  },
  'react-dom': {
    singleton: true,
    requiredVersion: false,
  },
  'next/router': {
    singleton: true,
    requiredVersion: false,
  },
  'next/link': {
    singleton: true,
    requiredVersion: false,
  },
};
