import { Button, Form, Input, InputNumber, Select, Switch } from "antd";
import { useEffect, useState } from "react";
import { get, post } from "../../../helpers/API.helper";
import { CREATE_STORE, STORES_DTOS } from "../../../helpers/APILinks";
import { alear_success } from "../../../helpers/Alert.helper";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

function CreateStore() {
  const [Accounts, setAccounts] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    // console.log(values);
    // sửa lại trường cho accountId sang INT
    // values.accountId = parseInt(values.accountId);

    // sửa lại trường isDelete => từ true => 1 và ngược lại
    values.status = values.status ? 1 : 0;

    values.isDelete = 0;


    console.log(values);
    const dataUpdate = await post(CREATE_STORE, values);

    console.log(dataUpdate)

    if (dataUpdate) {
      // thông báo ra hoàn thành tạo
      alear_success("Create!", "create");

      form.resetFields();

      // chuyển hướng đến listore
      // navigate(`/admin/store/`)
      navigate(`/admin/store/create`);
    }
  };

  return (
    <>
      <h2 style={{ fontWeight: "500", margin: "10px 0 20px 3%" }}>Create Store</h2>

      <Form
        layout="horizontal"
        name="create-room"
        onFinish={handleSubmit}
        form={form}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 14 }}
      >
        <Form.Item
          label="Strore name"
          name="storeName"
          rules={[
            {
              required: true,
              message: "Please input your name store!",
            },
          ]}
          // style={{ minWidth: "40px" }}
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
          name="status"
          label="Switch"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch
            checkedChildren="active"
            unCheckedChildren="InActive"
            defaultChecked
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ margin: "10px 0 0 5%" }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default CreateStore;
