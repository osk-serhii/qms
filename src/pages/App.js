import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation, Navigate  } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { refresh } from '../store/authSlice';
import Login from './auth/Login';
import AppContainer from "./layout/AppContainer";
import Home from "./home";
import BasicSetting from "./settings/Basic";
import ProductGroup from "./settings/Basic/ProductGroup";
import Plant from "./settings/Basic/Plant";
import Department from './settings/Basic/Department';
import Employee from './settings/Basic/Employee';
import ManagementRep from './settings/Basic/ManagementRep';
import CustomerComplaintRep from './settings/Basic/CustomerComplaintRep';


export default function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if(user) return;
    dispatch(refresh()).then((res) => {
      if(res.payload?.user) {
        navigate(location.pathname);
      }
    });
  }, []);

  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        {/*<Route path="reset-password/:token" element={<ResetPassword />} />*/}
        <Route path="*"  element={<Navigate replace to="/" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<AppContainer />}>
        <Route path="/" element={<Home />} />

        <Route path="/settings">
          <Route path="basic" element={<BasicSetting />}>
            <Route path="product-group" element={<ProductGroup />} />

            <Route path="plant" element={<Plant />} />
            <Route path="department" element={<Department />} />
            
            <Route path="employee" element={<Employee />} />
            
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
