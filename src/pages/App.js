import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation, Navigate  } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { refresh } from '../store/authSlice';


import Home from "./home";
import AppContainer from "./layout/AppContainer";

import Login from './auth/Login';

import BasicSetting from "./settings/Basic";
import ProductGroup from "./settings/Basic/ProductGroup";
import Plant from "./settings/Basic/Plant";
import Department from './settings/Basic/Department';
import Employee from './settings/Basic/Employee';
import ManagementRep from './settings/Basic/ManagementRep';
import CustomerComplaintRep from './settings/Basic/CustomerComplaintRep';

import StrategicAnalysis from './modules/StrategicAnalysis';
import InterestedPartiesAnalysisExpectation from './modules/StrategicAnalysis/InterestedPartiesAnalysisExpectation';
import InternalExternalContextAnalysis from './modules/StrategicAnalysis/InternalExternalContextAnalysis';
import Strategy from './modules/StrategicAnalysis/Strategy';

import MinutesMeeting from './modules/MinutesMeeting';
import ManagementChange from './modules/ManagementChange';

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

          {/*<Route path="*" element={<BasicSetting />} />
          <Route index element={<BasicSetting />} />*/}
        </Route>

        <Route path="/modules">
          <Route path="strategic-analysis" element={<StrategicAnalysis />}>
            <Route path="interested-parties-analysis-expectation" element={<InterestedPartiesAnalysisExpectation />} />
            <Route path="internal-external-context-analysis" element={<InternalExternalContextAnalysis />} />
            <Route path="strategy" element={<Strategy />} />
          </Route>

          <Route path="minutes-meeting" element={<MinutesMeeting />}/>
          <Route path="management-change" element={<ManagementChange />}/>
        </Route>
      </Route>
    </Routes>
  );
}
