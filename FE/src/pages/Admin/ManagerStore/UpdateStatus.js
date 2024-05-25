import { message } from "antd";
import { put } from "../../../helpers/API.helper";

const updateStatus = async (record, onReload) => {
  try {
    const newStatus = record.status === 1 ? 0 : 1;
    const response = await put(`http://localhost:5264/api/Account/${record.accountId}/status?newStatus=${newStatus}`);
    if (response.ok) {
      message.success("Account status updated successfully");       
      onReload();
    } else {
      throw new Error('Failed to update account status');
    }
  } catch (error) {
    message.error(`Failed to update account status: ${error.message}`);
    console.error("Error in Status", error);
  }
};
export default updateStatus;