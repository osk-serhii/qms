import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faLock, faUnlock, faPen } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, Input, Table, Tooltip, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import axios from 'axios';

import {
  setList,
  loadProductGroups
} from "../../../../store/productGroupsSlice";
import ProductGroupForm from "./Form";
import SideOverlap from "../../../../@components/SideOverlap";
import {
  DATETIME_DEFAULT_FORMAT
} from '../../../../services/config';

function ProductGroup() {

  const searchInputRef = useRef(null);
  const dispatch = useDispatch();
  const productGroups = useSelector((state) => state.productGroups.list);
  const [loading, setLoading] = useState(false);

  const [editingRowId, setEditingRowId] = useState(-1);

  const handleTableFilterChange = async () => {

    setLoading(true);
    dispatch(
      loadProductGroups({
        searchVal: productGroups.searchVal,
        pageSize: productGroups.pagination.pageSize,
        page: productGroups.pagination.current
      })
    );
    setLoading(false);
    searchInputRef.current.focus();
  };

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
            .post(`/settings/product-groups/block/${rowId}`)
            .then((res) => res.data);

          if (res?.data?.id) {
            message.success("Action successfully.");
            handleTableFilterChange();
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

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Status",
      dataIndex: "is_active",
      render: (isActive) => <span>{isActive ? "Active" : "Blocked"}</span>
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

  const handleSearch = (value) => {
     dispatch(setList({ searchVal: value }))
  }

  const handlePagenation = (pagination) => {
    dispatch(setList({ pagination }))
  }

  useEffect(() => {
    if (editingRowId === -1) {
      handleTableFilterChange();
    }
  }, [editingRowId]);

  useEffect(() => {
    handleTableFilterChange();
  }, [productGroups.searchVal]);

  return (
    <div style={{ minHeight: 360 }}>
      <div className="flex justify-between mb-2">
        <Input.Search
          placeholder="search..."
          className="w-60"
          defaultValue={productGroups.searchVal}
          //value={productGroups.searchVal}
          ref={searchInputRef}
          onSearch={handleSearch} />
        <Button
          type="primary"
          onClick={() => setEditingRowId(null)}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-1" />
          New Product Group
        </Button>
      </div>

      <Table
        columns={columns}
        pagination={productGroups.pagination}
        dataSource={productGroups.data}
        loading={loading}
        size="middle"
        onChange={(pagenation) => handlePagenation(pagenation)}
        rowKey={(record) => record.id}
      />

      {/* Start Form */}
      <SideOverlap
        open={editingRowId !== -1}
        onClose={() => {
          setEditingRowId(-1);
        }}
      >
        <ProductGroupForm
          id={editingRowId}
          onSave={() => setEditingRowId(-1)} />
      </SideOverlap>
      {/* End Form */}
    </div>
  );
}

export default ProductGroup;
