import { Breadcrumb } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";

function BasicSetting() {
  const location = useLocation();
  return (
    <>
      <Breadcrumb className="mx-4 my-2">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Settings</Breadcrumb.Item>
        <Breadcrumb.Item>Basic Settings</Breadcrumb.Item>
      </Breadcrumb>

      <div className="bg-white border-t border-b border-gray-200 p-3">
        <div className="p-2 mb-3 border border-gray-200">
          <Link
            to={`/settings/basic/product-group`}
            className={`ant-btn ${
              location.pathname.indexOf(`/settings/basic/product-group`) === 0
                ? "ant-btn-primary"
                : ""
            }`}
          >
            Product Group
          </Link>
          <Link
            to={`/settings/basic/plant`}
            className={`ml-2 ant-btn ${
              location.pathname.indexOf(`/settings/basic/plant`) === 0
                ? "ant-btn-primary"
                : ""
            }`}
          >
            Plant
          </Link>
          <Link
            to={`/settings/basic/department`}
            className={`ml-2 ant-btn ${
              location.pathname.indexOf(`/settings/basic/department`) === 0
                ? "ant-btn-primary"
                : ""
            }`}
          >
            Department
          </Link>
          <Link
            to={`/settings/basic/employee`}
            className={`ml-2 ant-btn ${
              location.pathname.indexOf(`/settings/basic/employee`) === 0
                ? "ant-btn-primary"
                : ""
            }`}
          >
            Employee
          </Link>
          <Link
            to={`/settings/basic/management-rep`}
            className={`ml-2 ant-btn ${
              location.pathname.indexOf(`/settings/basic/management-rep`) === 0
                ? "ant-btn-primary"
                : ""
            }`}
          >
            Management Rep
          </Link>
          <Link
            to={`/settings/basic/customer-complaint-rep`}
            className={`ml-2 ant-btn ${
              location.pathname.indexOf(
                `/settings/basic/customer-complaint-rep`
              ) === 0
                ? "ant-btn-primary"
                : ""
            }`}
          >
            Customer Complaint Rep
          </Link>
        </div>

        <div className="border border-gray-200 p-2">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default BasicSetting;
