import { Breadcrumb } from "antd";

function BasicSetting() {
  return (
    <>
      <Breadcrumb className="mx-4 my-4">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Settings</Breadcrumb.Item>
        <Breadcrumb.Item>Plants</Breadcrumb.Item>
      </Breadcrumb>

      <div className="bg-white p-6" style={{ minHeight: 360 }}>
        This is plants setting page.
      </div>
    </>
  );
}

export default BasicSetting;
