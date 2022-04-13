import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faLock, faUnlock, faPen } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, Input, Table, Tooltip, message } from "antd";
import axios from 'axios';
import moment from 'moment';

import {
  DATETIME_DEFAULT_FORMAT
} from '../../../../services/config';
import EmployeeForm from "./Form";
import SideOverlap from "../../../../@components/SideOverlap";

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
      dataIndex: "id_num",
    },
    {
      title: "E-Mail",
      dataIndex: "email",
    },
    {
      title: "Plant",
      dataIndex: "plant",
      render: (plant) => plant.title
    },
    {
      title: "Department",
      dataIndex: "department",
      render: (department) => department.name
    },
    {
      title: "Plant Head",
      dataIndex: "is_plant_head",
      render: (isPlantHead) => isPlantHead ? "Yes" : "No"
    },
    {
      title: "Platform User",
      dataIndex: "is_platform_user",
      render: (isPlatformUser) => isPlatformUser ? "Yes" : "No"
    },
    {
      title: 'Status',
      dataIndex: 'is_active',
      render: (isActive) => <span>{ isActive ? 'Active' : 'Blocked' }</span>
    },
    {
      title: "Created",
      dataIndex: "created_at",
      render: (createdAt) => moment(createdAt).format(DATETIME_DEFAULT_FORMAT),
    },
    {
      title: "Modified",
      dataIndex: "updated_at",
      render: (updatedAt) => moment(updatedAt).format(DATETIME_DEFAULT_FORMAT),
    },
    {
      title: <div className="text-center">Action</div>,
      width: 100,
      render: (row) => (
        <div className="text-center">
          <Tooltip title="Edit">
            <Button
              className="border-0 hover:bg-transparent"
              icon={<FontAwesomeIcon icon={faPen} />}
              onClick={() => setEditingRowId(row.id)}
            />
          </Tooltip>
          <Tooltip title={row.is_active ? 'block' : 'active'}>
            <Button
              className="border-0 hover:bg-transparent"
              icon={<FontAwesomeIcon icon={row.is_active ? faLock: faUnlock } />}
              onClick={() => blockRow(row.id)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const searchInputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [searchVal, setSearchVal] = useState('');
  const [pagination, setpagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const [editingRowId, setEditingRowId] = useState(-1);

  const loadData = async (searchVal, pagination) => {
    setLoading(true);
    const employees = await axios.get("/settings/employees", {params: {
      searchVal,
      page: pagination.current,
      pageSize: pagination.pageSize,
    }}).then((res) => res.data);
    setLoading(false);
    
    searchInputRef.current.focus();
    setData(employees.data);
    setpagination({
      current: employees.meta.current_page,
      pageSize: employees.meta.per_page,
      total: employees.meta.total,
    });
  };

  useEffect(() => {
    if(editingRowId === -1) {
      loadData(searchVal, pagination);
    }
  },[editingRowId]);

  const handleSearch = (value) => {
    setSearchVal(value);
    const newPagination = {
      current: 1,
      pageSize: pagination.pageSize,
      total: pagination.total 
    };
    loadData(value, newPagination);
  }

  const handlepagination = (pagination) => {
    loadData(searchVal, pagination);
  }

  const blockRow = async (rowId) => {
    Modal.confirm({
      title: (
        <div className="text-center">
          Are you sure?
        </div>
      ),
      okText: "YES",
      icon: null,
      cancelText: "NO",
      width: 340,
      okButtonProps: {
        className: "btn-yellow hvr-float-shadow w-32 h-10 text-xs ml-3.5",
      },
      cancelButtonProps: {
        className: "btn-danger hvr-float-shadow w-32 h-10 text-xs",
      },
      onOk: async () => {
        try {
          const res = await axios
            .post(`/settings/employees/block/${rowId}`)
            .then((res) => res.data);
          if (res?.data?.id) {
            message.success("Action successfully.");
            loadData(searchVal, pagination);
          } else {
            throw new Error("Something went wrong on server.");
          }
        } catch (err) {
          message.error("Something went wrong. Please try again later.");
        }
      },
      onCancel() {},
    });
  }
  return (
    <div style={{ minHeight: 360 }}>
      <div className="flex justify-between mb-2">
        <Input.Search 
          placeholder="Search..." 
          className="w-60"
          defaultValue={searchVal}
          ref={searchInputRef}
          onSearch={handleSearch}
          />
        <Button
          type="primary"
          onClick={() => setEditingRowId(null)}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-1" />
          New Employee
        </Button>
      </div>

      <Table 
        columns={columns} 
        dataSource={data} 
        loading={loading}
        size="middle"
        pagination={pagination}
        onChange={(pagination) => handlepagination(pagination)}
        rowKey={(record) => record.id} />

      {/* Start Form */}
        <SideOverlap
          open={editingRowId !== -1}
          width="100%"
          showClose={true}
          onClose={() => {
            setEditingRowId(-1);
          }}
        >
          <EmployeeForm
            id={editingRowId}
            onSave={() => setEditingRowId(-1)} />
        </SideOverlap>
      {/* End Form */}
    </div>
  );
}

export default Employee;