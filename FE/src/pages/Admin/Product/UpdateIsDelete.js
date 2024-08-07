import React from "react";
import { Button, message } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import { put } from "../../../helpers/API.helper";
import Swal from "sweetalert2";
import { LOCALHOST_API, UPDATE_Employee_ID } from "../../../helpers/APILinks";

function UpdateIsDelete({ record, onReload }) {
  // console.log("Record in UpdateIsDelete:", record);

  const today = new Date();
  const formattedDate = today.toLocaleDateString('vi-VN'); // Định dạng ngày theo tiếng Việt
  console.log(`Current date: ${formattedDate}`); 

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
        const response = await put(`${LOCALHOST_API}/api/ProductSizes/delete/${record.productSizeID}?delete=1`);
        console.log("Response from update API:", response);
        if (response.ok) {
          // Notify success
          Swal.fire({
            title: "Deleted!",
            text: "Your product has been deleted.",
            icon: "success",
          });
          console.log("Response from update API khi ok:", response);
          // Call onReload to refresh data
          onReload();
        } else {
          throw new Error('Failed to update product IsDelete');
        }
      }
    } catch (error) {
      message.error(`Failed to update product IsDelete: ${error.message}`);
      console.error("Error in UpdateIsDelete:", error);
    }
  };

  return (
    <Button danger size='small' onClick={handleUpdate} icon={<DeleteOutlined />}></Button>
  );
}

export default UpdateIsDelete;
