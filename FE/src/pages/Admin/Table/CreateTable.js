import React from 'react'
import { Button, Form, Input, InputNumber, Select, Space, Switch } from "antd";

function CreateTable() {
 

    
    <div>CreateTable</div>

    const [form] = Form.useForm();

const handleSubmit = async (values) => {
  console.log(values)
    // const response = await createRoom(values);
    // console.log(response);
    // if (response) {
    //     form.resetFields();
    // }
};

return (
    <>
        <h2>Thêm table mới</h2>

        <Form
            name="create-table"
            onFinish={handleSubmit}
            form={form}
           
        >
            <Form.Item
                label="Tên bàn"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your name room!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

           


            <Form.Item
                name="status"
                label="Trạng thái"
                valuePropName="checked"
                initialValue={true} // Giá trị mặc định là Còn phòng
            >
                <Switch checkedChildren="Bàn trống" unCheckedChildren="Bàn full" defaultChecked />
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

export default CreateTable