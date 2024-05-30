import React from "react";
import { Button, message, Popconfirm } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import { patch, put } from "../../../helpers/API.helper";
import Swal from "sweetalert2";

function UpdateIsDelete({ record, onReload}) {
  console.log(record.accountId)
  const handleUpdate = async () => {
    try {
      const confirm = await Swal.fire({
        title: "Are you want to delete?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (confirm.isConfirmed) {
        const response = await put(`http://localhost:5264/api/Account/${record.accountId}/IsDelete?isdelete=1`, {
          storeId: record.accountId,
        });

        console.log(response)
        if (response.ok) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          message.success("Account IsDelete updated successfully");
          onReload();
        } else {
          throw new Error('Failed to update account IsDelete');
        }
      }
    } catch (error) {
      message.error(`Failed to update account IsDelete: ${error.message}`);
      console.error("Error in UpdateIsDelete", error);
    }
  };
  return (
  
      <Button danger size='small' icon={<DeleteOutlined />} onClick={handleUpdate}>Delete</Button>
  
  );
}

export default UpdateIsDelete;



