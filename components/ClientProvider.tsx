'use client';

import dynamic from 'next/dynamic';
import { Provider } from 'react-redux';
import { store } from '../shared/store';

interface ClientProviderProps {
  children: React.ReactNode;
}

function ReduxProvider({ children }: ClientProviderProps) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

const ClientProvider = dynamic(() => Promise.resolve(ReduxProvider), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export default ClientProvider;
 