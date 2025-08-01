import dynamic from "next/dynamic";
import React from "react";
const NoSSRComponent = dynamic(() => import("header/App"), { ssr: false });

const AppHome = () => {
  return (
    <div>
      <NoSSRComponent />
    </div>
  );
};

export default AppHome;
