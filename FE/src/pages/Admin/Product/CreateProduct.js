import { Button, Form, Input, InputNumber, Select, Switch } from "antd";

const { Option } = Select;

function CreateProduct() {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    console.log(values);
    // const response = await createRoom(values);
    // console.log(response);
    // if (response) {
    //     form.resetFields();
    // }
  };

  return (
    <>
      <h2>Create New Store</h2>

      <Form name="create-product" onFinish={handleSubmit} form={form}>
        <Form.Item
          label="Product name"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input product name !!!",
            },
          ]}
        >
          <Input placeholder="Input name"/>
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input description name !!!",
            },
          ]}
        >
          <Input.TextArea rows={6} showCount maxLength={100} placeholder="Input description"/>
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please input category name!" }]}
        >
          <Select placeholder="Select your category">
            <Option value="Trà sữa">Trà sữa</Option>
            <Option value="Nước uống">Nước uống</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="size"
          label="Size"
          rules={[{ required: true, message: "Please input size name!" }]}
        >
          <Select placeholder="Select your size">
            <Option value="S">S</Option>
            <Option value="M">M</Option>
            <Option value="L">L</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input price price! !!!",
            },
          ]}
        >
          <Input placeholder="Input price"/>
        </Form.Item>

        <Form.Item
          label="Discount"
          name="discount"
          rules={[
            {
              required: true,
              message: "Please input discount name! !!!",
            },
          ]}
        >
          <Input placeholder="Input discount"/>
        </Form.Item>

        <Form.Item
          name="feature"
          label="Feature"
          valuePropName="checked"
          initialValue={true} // Giá trị mặc định là VIP
        >
          <Switch
            checkedChildren="Feature"
            unCheckedChildren="Not Feature"
            defaultChecked
          />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          valuePropName="checked"
          initialValue={true} // Giá trị mặc định là Còn phòng
        >
          <Switch
            checkedChildren="Active"
            unCheckedChildren="Inactive"
            defaultChecked
          />
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

export default CreateProduct;