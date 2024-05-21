import React from 'react'
import { Button, Form, Input, InputNumber, Select, Switch } from "antd";
const { Option } = Select;
function CreateTopping() {
  const [form] = Form.useForm();

    const handleSubmit = async (values) => {
      console.log(values)
        // const response = await CreateStore(values);
        // console.log(response);
        // if (response) {
        //     form.resetFields();
        // }
    };
  return (
    <>
    <h2>Create Store</h2>

    <Form
        name="create-topping"
        onFinish={handleSubmit}
        form={form}
       
    >
        <Form.Item
            label="Topping name"
            name="toppingName"
            rules={[
                {
                    required: true,
                    message: 'Please input your name store!',
                },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Price"
            name="price"
            rules={[
                {
                    required: true,
                    message: 'Please input the address store!',
                },
            ]}
        >
            <Input  />
        </Form.Item>
    
        <Form.Item
          name="status"
          label="Status"
          valuePropName="checked"
          initialValue={true} // Giá trị mặc định là Còn phòng
        >
          <Switch
            checkedChildren="stock"
            unCheckedChildren="out of stock"
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
  )
}

export default CreateTopping