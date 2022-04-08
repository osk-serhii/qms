import React from "react";
import { Routes, Route } from "react-router-dom";
import AppContainer from "./layout/AppContainer";
import Home from "./Home";
import BasicSetting from "./settings/Basic";
import ProductGroup from "./settings/Basic/ProductGroup";
import ProductGroupForm from "./settings/Basic/ProductGroup/Form";
import Plant from "./settings/Basic/Plant";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppContainer />}>
        <Route path="/" element={<Home />} />

        <Route path="/settings">
          <Route path="basic" element={<BasicSetting />}>
            <Route path="product-group" element={<ProductGroup />}>
              <Route path="create" element={<ProductGroupForm />} />
              <Route path=":id" element={<ProductGroupForm />} />
            </Route>

            <Route path="plant" element={<Plant />} />
          </Route>

          <Route path="*" element={<BasicSetting />} />
          <Route index element={<BasicSetting />} />
        </Route>
      </Route>
    </Routes>
  );
}
