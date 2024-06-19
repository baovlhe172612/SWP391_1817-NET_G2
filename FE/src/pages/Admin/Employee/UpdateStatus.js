import { message } from "antd";
import { put } from "../../../helpers/API.helper";
import { UPDATE_Employee_ID } from "../../../helpers/APILinks";

const updateStatus = async (record, onReload) => {
  try {
    const newStatus = record.status === 1 ? 0 : 1;
    const response = await put(`${UPDATE_Employee_ID}/${record.accountId}/status?newStatus=${newStatus}`);
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