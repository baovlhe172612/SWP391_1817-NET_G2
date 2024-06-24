import { message } from "antd";
import { put } from "../../../helpers/API.helper";
import { LIST_FEEDBACK } from "../../../helpers/APILinks";

const updateStatus = async (record, onReload) => {
  console.log("record", record)
  console.log("record.isDelete", record.isDelete)
  try {
    const newStatus = record.isDelete === 1 ? 0 : 1;
    console.log("newStatus", newStatus)
    const response = await put(`${LIST_FEEDBACK}/${record.messengerBoxId}/${newStatus}`);
    console.log("response", response)
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
  }
export default updateStatus;