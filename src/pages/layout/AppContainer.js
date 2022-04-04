import React from "react";
import { Outlet } from "react-router-dom";

const AppContainer = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default AppContainer;
