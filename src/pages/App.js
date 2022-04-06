import React from "react";
import { Routes, Route } from "react-router-dom";
import AppContainer from "./layout/AppContainer";
import Home from "./Home";
import BasicSetting from "./settings/Basic";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppContainer />}>
        <Route path="/" element={<Home />} />

        <Route path="/settings">
          <Route path="basic" element={<BasicSetting />} />

          <Route path="*" element={<BasicSetting />} />
          <Route index element={<BasicSetting />} />
        </Route>
      </Route>
    </Routes>
  );
}
