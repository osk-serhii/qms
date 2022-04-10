import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBan, faPen } from "@fortawesome/free-solid-svg-icons";
import { Button, Input, Table, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { loadProductGroups } from "../../../../store/productGroupsSlice";
import ProductGroupForm from "./Form";
import SideOverlap from "../../../../@components/SideOverlap";

function ProductGroup() {
  const dispatch = useDispatch();
  const productGroups = useSelector((state) => state.productGroups.list);
  const [loading, setLoading] = useState(false);

  const [editingRowId, setEditingRowId] = useState(-1);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
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
      render: (row) => (
        <div className="text-center">
          <Tooltip title="Edit">
            <Button
              className="border-0 hover:bg-transparent"
              icon={<FontAwesomeIcon icon={faPen} />}
              onClick={() => setEditingRowId(row.id)}
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

  const handleTableChange = async (pagination) => {
    setLoading(true);
    dispatch(
      loadProductGroups({
        limit: pagination.pageSize,
      })
    );
    setLoading(false);
  };

  useEffect(() => {
    handleTableChange(productGroups.pagination);
  }, []);

  return (
    <div style={{ minHeight: 360 }}>
      <div className="flex justify-between mb-2">
        <Input.Search placeholder="input search text" className="w-60" />
        <Button
          type="primary"
          to={`/settings/basic/product-group/create`}
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
        onChange={handleTableChange}
        rowKey={(record) => record.id}
      />

      {/* Start Form */}
      <SideOverlap
        open={editingRowId !== -1}
        onClose={() => {
          setEditingRowId(-1);
        }}
      >
        <ProductGroupForm id={editingRowId} />
      </SideOverlap>
      {/* End Form */}
    </div>
  );
}

export default ProductGroup;
