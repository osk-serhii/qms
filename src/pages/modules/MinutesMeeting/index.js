import { Breadcrumb } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";

function MinutesMeeting() {
  const location = useLocation();
  return (
    <>
      <Breadcrumb className="mx-4 my-2">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Modules</Breadcrumb.Item>
        <Breadcrumb.Item>Minutes of Meeting</Breadcrumb.Item>
      </Breadcrumb>

      <div className="bg-white border-t border-b border-gray-200 p-3">
        {/*<div className="p-2 mb-3 border border-gray-200">
          <Link
            to={`/settings/basic/product-group`}
            className={`ant-btn ${
              location.pathname.indexOf(`/settings/basic/product-group`) === 0
                ? "ant-btn-primary"
                : ""
            }`}
          >
            Category 1
          </Link>
        </div>*/}

        <div className="border border-gray-200 p-2">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MinutesMeeting;
