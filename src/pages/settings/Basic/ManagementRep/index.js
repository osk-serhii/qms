import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faLock, faUnlock, faPen } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, Input, Table, Tooltip, message } from "antd";
import axios from 'axios';
import moment from 'moment';

import {
  DATETIME_DEFAULT_FORMAT
} from '../../../../services/config';
import ManagementRepForm from "./Form";
import SideOverlap from "../../../../@components/SideOverlap";

const ManagementRep = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: 'employee',
      render: (employee) => (employee.first_name + ' ' + employee.last_name)
    },
    {
      title: "Status",
      dataIndex: "is_active",
      render: (isActive) => <span>{isActive ? "Active" : "Blocked"}</span>
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
    const mgtReps = await axios.get("/settings/mgt-reps", {params: {
      searchVal,
      page: pagination.current,
      pageSize: pagination.pageSize,
    }}).then((res) => res.data);
    setLoading(false);

    setData(mgtReps.data);
    setpagination({
      current: mgtReps.meta.current_page,
      pageSize: mgtReps.meta.per_page,
      total: mgtReps.meta.total,
    });
  };

  useEffect(() => {
    if(editingRowId === -1) {
      loadData(searchVal, pagination);
    }
  },[editingRowId]);

  const handleSearch = (value) => {
    setSearchVal(value)
    loadData(value, pagination);
  }

  const handlepagination = (pagination) => {
    setpagination(pagination);
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
            .post(`/settings/mgt-reps/block/${rowId}`)
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
          onSearch={handleSearch}
          />
        <Button
          type="primary"
          onClick={() => setEditingRowId(null)}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-1" />
          New Management Representative
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
          onClose={() => {
            setEditingRowId(-1);
          }}
        >
          <ManagementRepForm
            id={editingRowId}
            onSave={() => setEditingRowId(-1)} />
        </SideOverlap>
      {/* End Form */}
    </div>
  );
}

export default ManagementRep;