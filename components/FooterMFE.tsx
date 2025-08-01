import React, { Suspense } from "react";
import dynamic from "next/dynamic";

const RemoteFooter = dynamic(() => import("footer/App"), {
  ssr: false,
  loading: () => (
    <div style={{
      backgroundColor: '#f5f5f5',
      padding: '20px 24px',
      borderTop: '1px solid #e0e0e0',
      textAlign: 'center',
    }}>
      Carregando Footer...
    </div>
  ),
});

const FooterMFE = () => {
  return (
    <Suspense fallback={
      <div style={{
        backgroundColor: '#f5f5f5',
        padding: '20px 24px',
        borderTop: '1px solid #e0e0e0',
        textAlign: 'center',
      }}>
        <p style={{ margin: 0, color: '#666' }}>
          © 2025 VR System - Todos os direitos reservados
        </p>
      </div>
    }>
      <RemoteFooter />
    </Suspense>
  );
};

export default FooterMFE;
