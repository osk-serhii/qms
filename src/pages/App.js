import React from "react";
import { Routes, Route } from "react-router-dom";
import AppContainer from "./layout/AppContainer";
import Home from "./home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppContainer />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}
