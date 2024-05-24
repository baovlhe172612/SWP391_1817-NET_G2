import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { get } from "../../../helpers/API.helper";
import { useParams } from "react-router-dom";
import { LIST_ACCOUNT, STORE_DETAIL } from "../../../helpers/APILinks";
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

          // Dùng phương thức setFieldsValue để khởi tạo giá trị ban đầu cho Form
          form.setFieldsValue({
            storeName: data.storeName,
            location: data.location,
            accountId: data.userName,
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
  }, []);

  const handleSubmit = async (values) => {
    console.log(values);
  };

  return (
    <>
      <h2>Edit Store</h2>

      <Form name="create-room" onFinish={handleSubmit} form={form}>
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
