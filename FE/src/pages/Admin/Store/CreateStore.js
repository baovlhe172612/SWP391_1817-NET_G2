import { Button, Form, Input, InputNumber, Select, Switch } from "antd";
import { useEffect, useState } from "react";
import { get } from "../../../helpers/API.helper";

const { Option } = Select;

function CreateStore() {
  const [Accounts, setAccounts] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await get("http://localhost:5264/api/Account");

        if (data) {
          setAccounts(data);
        }
      } catch (error) {
        console.log("err in CreateStore", error);
        setAccounts([]);
      }
    };

    fetchApi();
  }, []);

  const handleSubmit = async (values) => {
    console.log(values);
    // const response = await CreateStore(values);
    // console.log(response);
    // if (response) {
    //     form.resetFields();
    // }
  };

  return (
    <>
      <h2>Create Store</h2>

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
            {Accounts.length > 0 &&
              Accounts.map((account) => (
                <Option value={`${account.accountId}`}>{`${account.userName}`}</Option>
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

export default CreateStore;
