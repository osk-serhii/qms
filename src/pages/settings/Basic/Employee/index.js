import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBan, faPen } from "@fortawesome/free-solid-svg-icons";
import { Button, Input, Table, Tooltip } from "antd";
import { Link, Outlet } from "react-router-dom";

const Employee = () => {
  const columns = [
    {
      title: "First Name",
      dataIndex: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
    },
    {
      title: "Employee ID",
      dataIndex: "employee_id",
    },
    {
      title: "E-Mail",
      dataIndex: "email",
    },
    {
      title: "Plant",
      dataIndex: "plant",
    },
    {
      title: "Plant Head",
      dataIndex: "plant_head",
    },
    {
      title: "Department",
      dataIndex: "department",
    },
    {
      title: "Plantform User",
      dataIndex: "plantform_user",
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
      first_name: "First 1",
      last_name: "Last1",
      employee_id: "SDES3245",
      email: "test1@gmail.com",
      plant: "Plant1",
      department: "Management",
      plant_head: 'Yes',
      plantform_user: "Yes",
      createdAt: "2022-01-03 11:11:11",
      modifiedAt: "2022-03-01 09:09:09",
    },
  ];

  return (
    <div style={{ minHeight: 360 }}>
      <div className="flex justify-between mb-2">
        <Input.Search placeholder="input search text" className="w-60" />
        <Link
          to={`/settings/basic/employee/create`}
          className="ant-btn ant-btn-primary"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-1" />
          New Employee
        </Link>
      </div>

      <Table columns={columns} dataSource={data} size="middle" />

      <Outlet />
    </div>
  );
}

export default Employee;