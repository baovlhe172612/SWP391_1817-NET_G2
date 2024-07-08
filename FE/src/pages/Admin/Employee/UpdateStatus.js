import { message } from "antd";
import { put } from "../../../helpers/API.helper";
import { LOCALHOST_API } from "../../../helpers/APILinks";

const updateStatus = async (record, onReload) => {
  console.log("record",record)
  try {
    const newStatus = record.status === 1 ? 0 : 1;
    console.log("newStatus",newStatus)
    const response = await put(`${LOCALHOST_API}/api/Account/${record.accountId}/status?newStatus=${newStatus}`);
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