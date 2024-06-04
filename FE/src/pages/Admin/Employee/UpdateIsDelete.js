import React from "react";
import { Button, message, Popconfirm } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import { put } from "../../../helpers/API.helper";
import Swal from "sweetalert2";

function UpdateIsDelete({ record, onReload }) {
  const handleUpdate = async () => {
    try {
      const confirm = await Swal.fire({
        title: "Are you sure you want to delete?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (confirm.isConfirmed) {
        // Thực hiện cập nhật trạng thái IsDelete trong cơ sở dữ liệu
        const response = await put(`http://localhost:5264/api/Account/${record.accountId}/IsDelete?isdelete=1`, {
          accountId: record.accountId,
        });

        if (response.ok) {
          // Thông báo khi cập nhật thành công
          Swal.fire({
            title: "Deleted!",
            text: "Your account has been deleted.",
            icon: "success",
          });
          // Gọi hàm onReload để làm mới dữ liệu
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
    <Button danger size='small' onClick={handleUpdate} icon={<DeleteOutlined />}></Button>
  );
}

export default UpdateIsDelete;
