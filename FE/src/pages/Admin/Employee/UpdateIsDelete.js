import React from "react";
import { Button, message } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import { put } from "../../../helpers/API.helper";
import Swal from "sweetalert2";

function UpdateIsDelete({ record, onReload }) {
  console.log("Record in UpdateIsDelete:", record);

  const today = new Date();
  const formattedDate = today.toLocaleDateString('vi-VN'); // Định dạng ngày theo tiếng Việt
  console.log(`Current date: ${formattedDate}`); // Output: Ngày hiện tại: 05/06/2024

  const handleUpdate = async () => {
    console.log("record.statusDate before update:", record.statusDate);
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
        // Perform update of IsDelete status in the database
        const response = await put(`http://localhost:5264/api/Account/${record.accountId}/IsDelete?isdelete=1`, {
          accountId: record.accountId,
          statusDate: formattedDate,
        });

        console.log("Response from update API:", response);

        if (response.ok) {
          // Notify success
          Swal.fire({
            title: "Deleted!",
            text: "Your account has been deleted.",
            icon: "success",
          });
          console.log("Response from update API:", response);
          // Call onReload to refresh data
          onReload();
        } else {
          throw new Error('Failed to update account IsDelete');
        }
      }
    } catch (error) {
      message.error(`Failed to update account IsDelete: ${error.message}`);
      console.error("Error in UpdateIsDelete:", error);
    }
  };

  return (
    <Button danger size='small' onClick={handleUpdate} icon={<DeleteOutlined />}></Button>
  );
}

export default UpdateIsDelete;
