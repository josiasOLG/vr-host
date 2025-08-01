import React, { Suspense } from "react";
import dynamic from "next/dynamic";

const RemoteHeader = dynamic(() => import("header/App"), {
  ssr: false,
  loading: () => (
    <div style={{
      backgroundColor: '#1976d2',
      color: 'white',
      padding: '16px 24px',
      textAlign: 'center',
    }}>
      Carregando Header...
    </div>
  ),
});

const HeaderMFE = () => {
  return (
    <Suspense fallback={
      <div style={{
        backgroundColor: '#1976d2',
        color: 'white',
        padding: '16px 24px',
        textAlign: 'center',
      }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>VR System</h1>
        <p style={{ margin: '8px 0 0 0', fontSize: '14px', opacity: 0.9 }}>
          Sistema de Gestão
        </p>
      </div>
    }>
      <RemoteHeader />
    </Suspense>
  );
};

export default HeaderMFE;
