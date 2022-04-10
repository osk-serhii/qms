import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBan, faPen } from "@fortawesome/free-solid-svg-icons";
import { Button, Input, Table, Tooltip } from "antd";
import { Link, Outlet } from "react-router-dom";

const CustomerComplaintRep = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Created",
      dataIndex: "createdAt",
    },
    {
      title: "Modified",
      dataIndex: "modifiedAt",
    },
    {
      title: <div className="text-center">Action</div>,
      width: 100,
      render: () => (
        <div className="text-center">
          <Tooltip title="Edit">
            <Button
              className="border-0 hover:bg-transparent"
              icon={<FontAwesomeIcon icon={faPen} />}
            />
          </Tooltip>
          <Tooltip title="block">
            <Button
              className="border-0 hover:bg-transparent"
              icon={<FontAwesomeIcon icon={faBan} />}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const data = [
    {
      id: "1",
      name: "name1",
      createdAt: "2022-01-03 11:11:11",
      modifiedAt: "2022-03-01 09:09:09",
    },
    {
      id: "2",
      name: "name2",
      createdAt: "2022-01-03 11:11:11",
      modifiedAt: "2022-03-01 09:09:09",
    },
    {
      id: "3",
      name: "name3",
      createdAt: "2022-04-09 11:11:11",
      modifiedAt: "2022-04-10 09:09:09",
    },
  ];

  return (
    <div style={{ minHeight: 360 }}>
      <div className="flex justify-between mb-2">
        <Input.Search placeholder="input search text" className="w-60" />
        <Link
          to={`/settings/basic/product-group/create`}
          className="ant-btn ant-btn-primary"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-1" />
          New Customer Complaint Rep
        </Link>
      </div>

      <Table columns={columns} dataSource={data} size="middle" />

      <Outlet />
    </div>
  );
}

export default CustomerComplaintRep;