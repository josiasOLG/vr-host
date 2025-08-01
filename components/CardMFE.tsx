import dynamic from "next/dynamic";
import React from "react";

const CardComponent = dynamic(() => import("card/App"), { 
  ssr: false,
  loading: () => (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '24px',
      margin: '16px 0',
      backgroundColor: 'white',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      textAlign: 'center'
    }}>
      Carregando Card...
    </div>
  )
});

const CardMFE: React.FC = () => {
  return (
    <div style={{ 
      padding: '20px',
      minHeight: '400px'
    }}>
      <React.Suspense fallback={
        <div style={{
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          padding: '24px',
          margin: '16px 0',
          backgroundColor: 'white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          Carregando Card...
        </div>
      }>
        <CardComponent />
      </React.Suspense>
    </div>
  );
};

export default CardMFE;
