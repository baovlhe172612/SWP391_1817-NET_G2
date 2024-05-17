import React from 'react'
import { Button, Form, Input, InputNumber, Select, Space, Switch } from "antd";
function CreateCategory() {
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
            <h2>Create category</h2>

            <Form
                name="create-category"
                onFinish={handleSubmit}
                form={form}
               
            >
                <Form.Item
                    label="category name"
                    name="storeName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name category!',
                        },
                    ]}
                >
                    <Input />
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

export default CreateCategory