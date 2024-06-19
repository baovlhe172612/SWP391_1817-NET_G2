import { message } from "antd";
import { put } from "../../../helpers/API.helper";

const updateStatus = async (record, onReload) => {
  console.log("record", record)
  console.log("record.isDelete", record.isDelete)
  try {
    const newStatus = record.isDelete === 1 ? 0 : 1;
    console.log("newStatus", newStatus)
    const response = await put(`http://localhost:5264/api/MessengerBox/${record.messengerBoxId}/${newStatus}`);
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