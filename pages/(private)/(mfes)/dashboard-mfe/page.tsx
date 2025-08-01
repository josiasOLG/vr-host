import dynamic from "next/dynamic";
import React from "react";
const NoSSRComponent = dynamic(() => import("card/App"), { ssr: false });

const AppHome = () => {
  return (
    <div>
      <NoSSRComponent />
    </div>
  );
};

export default AppHome;
