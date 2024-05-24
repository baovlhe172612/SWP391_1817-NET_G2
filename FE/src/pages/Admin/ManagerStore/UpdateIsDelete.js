import React from "react";
import { Button, message, Popconfirm } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import { put } from "../../../helpers/API.helper";

function UpdateIsDelete({ record, onReload}) {
  const handleUpdate = async () => {
    try {
      const response = await put(`http://localhost:5264/api/Account/${record.accountId}/IsDelete?isdelete=0`);
      if (response.ok) {
        message.success("Account IsDelete updated successfully");       
        onReload();
      } else {
        throw new Error('Failed to update account IsDelete');
      }
    } catch (error) {
      message.error(`Failed to update account IsDelete: ${error.message}`);
      console.error("Error in UpdateIsDelete", error);
    }
  };

  return (
    <Popconfirm
      title="Are you sure to reactivate this account?"
      onConfirm={handleUpdate}
      okText="Yes"
      cancelText="No"
    >
      <Button danger size='small' icon={<DeleteOutlined />}>Reactivate</Button>
    </Popconfirm>
  );
}

export default UpdateIsDelete;
