import { message } from "antd";
import { put } from "../../../helpers/API.helper";
import { LOCALHOST_API } from "../../../helpers/APILinks";

const updateStatus = async (record, onReload) => {
  console.log("record",record)
  try {
    const newStatus = record.status ;
    console.log("newStatus",newStatus)
    const response = await put(`${LOCALHOST_API}/api/Order/update-status/${record.orderID}/1`);
    
    if (response.ok) {
      message.success("Order status updated successfully");       
      onReload();
    } else {
      throw new Error('Failed to update order status');
    }
  } catch (error) {
    message.error(`Failed to update order status: ${error.message}`);
    console.error("Error in Status", error);
  }
};
export default updateStatus;