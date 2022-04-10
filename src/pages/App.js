import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Login from './auth/Login';
import AppContainer from "./layout/AppContainer";
import Home from "./home";
import BasicSetting from "./settings/Basic";
import ProductGroup from "./settings/Basic/ProductGroup";
import ProductGroupForm from "./settings/Basic/ProductGroup/Form";
import Plant from "./settings/Basic/Plant";
import Department from './settings/Basic/Department';
import Employee from './settings/Basic/Employee';
import EmployeeForm from './settings/Basic/Employee/Form';
import ManagementRep from './settings/Basic/ManagementRep';
import CustomerComplaintRep from './settings/Basic/CustomerComplaintRep';

export default function App() {

  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        {/*<Route path="reset-password/:token" element={<ResetPassword />} />*/}
      </Routes>
    );
  }

  console.log('AppComponent=>', user);

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
            <Route path="department" element={<Department />} />
            
            <Route path="employee" element={<Employee />}>
              <Route path="create" element={<EmployeeForm />} />
              <Route path=":id" element={<EmployeeForm />} />
            </Route>
            
            <Route path="management-rep" element={<ManagementRep />} />
            <Route path="customer-complaint-rep" element={<CustomerComplaintRep />} />
          </Route>

          <Route path="*" element={<BasicSetting />} />
          <Route index element={<BasicSetting />} />
        </Route>
      </Route>
    </Routes>
  );
}
