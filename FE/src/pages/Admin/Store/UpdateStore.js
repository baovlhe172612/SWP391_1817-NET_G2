import { Button, Form, Input, Select, Switch } from "antd";
import { useEffect, useState } from "react";
import { get, patch } from "../../../helpers/API.helper";
import { useParams } from "react-router-dom";
import { LIST_ACCOUNT, STORE_DETAIL, UPDATE_STORE } from "../../../helpers/APILinks";
import Swal from "sweetalert2";
import { alear_success } from "../../../helpers/Alert.helper";
const { Option } = Select;

function UpdateStore() {
  const [store, setStore] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [form] = Form.useForm();
  const { id } = useParams();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await get(`${STORE_DETAIL}${id}`);
        const dataAccount = await get(`${LIST_ACCOUNT}`);

        if (data && dataAccount) {
          // thêm 1 key vale cho data Store
          // hàm find => tìm trong ARRAY thõa mãn 1 điều kiện gì đó
          data.userName = dataAccount.find(
            (dataAcc) => dataAcc.accountId == data.accountId
          ).userName;

          console.log(data)

          // Dùng phương thức setFieldsValue để khởi tạo giá trị ban đầu cho Form
          form.setFieldsValue({
            storeId: data.storeId,
            storeName: data.storeName,
            location: data.location,
            accountId: data.userName,
            isDelete: data.isDelete == 1 ? (true) : (false),
          });

          setStore(data);
          setAccounts(dataAccount);
        }
      } catch (error) {
        console.log("err in UpdateStore", error);
        setStore([]);
      }
    };

    fetchApi();
  }, [form]);

  const handleSubmit = async (values, accounts) => {
    // sửa lại biến cho accountId khi submit
    if (isNaN(parseInt(values.accountId))) {
      const accountId = accounts.find(
        (account) => account.userName == values.accountId
      ).accountId;

      values.accountId = accountId;
    } else {
      values.accountId = parseInt(values.accountId);
    }

    // sửa lại biến switch cho isDeleted
    values.isDelete = values.isDelete ? 1 : 0;

    const data = await patch(UPDATE_STORE, values);
    if(data) {
      // thông báo ra màn hình
      alear_success("Update!", "updated");
    }
  };

  return (
    <>
      <h2>Edit Store</h2>

      <Form
        name="create-room"
        onFinish={(values) => {
          handleSubmit(values, accounts);
        }}
        form={form}
      >
        <Form.Item label="Strore ID" name="storeId">
          <Input readOnly />
        </Form.Item>

        <Form.Item
          label="Strore name"
          name="storeName"
          rules={[
            {
              required: true,
              message: "Please input your name store!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
          rules={[
            {
              required: true,
              message: "Please input the address store!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="accountId"
          label="AccoutName"
          rules={[{ required: true, message: "Please select the utilities!" }]}
        >
          <Select allowClear placeholder="Select your account">
            {accounts.map((account) => (
              <Option key={account.accountId} values={account.accountId}>
                {account.userName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="isDelete" label="Switch" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default UpdateStore;
