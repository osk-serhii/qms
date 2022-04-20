import { Breadcrumb } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";

function StrategicAnalysis() {
  const location = useLocation();
  return (
    <>
      <Breadcrumb className="mx-4 my-2">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Modules</Breadcrumb.Item>
        <Breadcrumb.Item>Strategic Analysis</Breadcrumb.Item>
      </Breadcrumb>

      <div className="bg-white border-t border-b border-gray-200 p-3">
        <div className="p-2 mb-3 border border-gray-200">
          <Link
            to={`/modules/strategic-analysis/interested-parties-analysis-expectation`}
            className={`ant-btn ${
              location.pathname.indexOf(`/modules/strategic-analysis/interested-parties-analysis-expectation`) === 0
                ? "ant-btn-primary"
                : ""
            }`}
          >
            Analysis and Expectations of Interested Parties
          </Link>

           <Link
            to={`/modules/strategic-analysis/internal-external-context-analysis`}
            className={` ml-2 ant-btn ${
              location.pathname.indexOf(`/modules/strategic-analysis/internal-external-context-analysis`) === 0
                ? "ant-btn-primary"
                : ""
            }`}
          >
            Internal and External Context Analysis
          </Link>
          
          <Link
            to={`/modules/strategic-analysis/strategy`}
            className={` ml-2 ant-btn ${
              location.pathname.indexOf(`/modules/strategic-analysis/strategy`) === 0
                ? "ant-btn-primary"
                : ""
            }`}
          >
            Strategy
          </Link>
          
          <Link
            to={`/modules/strategic-analysis/Objectvie`}
            className={` ml-2 ant-btn ${
              location.pathname.indexOf(`/modules/strategic-analysis/Objective`) === 0
                ? "ant-btn-primary"
                : ""
            }`}
          >
            Objective
          </Link>
        </div>

        <div className="border border-gray-200 p-2">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default StrategicAnalysis;
