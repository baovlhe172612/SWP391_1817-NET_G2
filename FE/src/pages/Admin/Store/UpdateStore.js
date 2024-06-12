import { Button, Form, Input, Select, Switch } from "antd";
import { useEffect, useState } from "react";
import { get, patch } from "../../../helpers/API.helper";
import { useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { alear_success } from "../../../helpers/Alert.helper";
import { useNavigate } from "react-router-dom";
import { UPDATE_STORE } from "../../../helpers/APILinks";
const { Option } = Select;

function UpdateStore() {
  const [store, setStore] = useState([]);
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await get(`http://localhost:5264/api/stores/${id}`);
        console.log(data);
        // const dataAccount = await get(`${LIST_ACCOUNT}`);
        // Dùng phương thức setFieldsValue để khởi tạo giá trị ban đầu cho Form
        form.setFieldsValue({
          storeId: data.storeId,
          storeName: data.storeName,
          location: data.location,
          status: data.status === 1,
        });
        setStore(data);
      } catch (error) {
        console.log("err in UpdateStore", error);
        setStore([]);
      }
    };

    fetchApi();
  }, [form]);

  const handleSubmit = async (values) => {
    // sửa lại biến switch cho isDeleted
    values.status = values.status ? 1 : 0;
    console.log({ ...store, ...values });

    store.isDelete = 0;

    const data = await patch(`${UPDATE_STORE}/${id}`, { ...store, ...values });
    if (data) {
      // thông báo ra màn hình
      alear_success("Update!", "updated");

      navigate(`/admin/store/`);
    }
  };

  return (
    <>
      <h2>Store Detail</h2>

      <Form
        name="create-room"
        onFinish={(values) => {
          handleSubmit(values);
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
              message: "Please input the location store!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="status" label="Switch" valuePropName="checked">
          <Switch checkedChildren="active" unCheckedChildren="inactive" />
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
