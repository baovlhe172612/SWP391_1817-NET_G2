import React from 'react'
import { Button, Form, Input, InputNumber, Select, Space, Switch, message } from "antd";
import { post } from '../../../helpers/API.helper';
import { useSelector } from 'react-redux';
import { CREATE_TABLE } from '../../../helpers/APILinks';

function CreateTable() {
    const [form] = Form.useForm();
    const account = useSelector(state => state.AccountReducer);
    const handleSubmit = async (values) => {
    try {
        values.isDelete=0
        values.storeId = account.storeId
        values.status = 1
        values.tableName=form.getFieldValue('tableName');
        console.log(values)
        const response = await post(`${CREATE_TABLE}`, values);
        if (response) {
          form.resetFields();
          message.success("Tavle created successfully!");
        }
      } catch (error) {
        //message.error("Product creation failed!");
        console.error("Failed to create Product. Please try again later", error);
      }
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
                name="tableName"
                rules={[
                    {
                        required: true,
                        message: 'Please input your name table!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="isDelete"
                label="Trạng thái"
                valuePropName="checked"
                initialValue={true} // Giá trị mặc định là Còn phòng
            >
                <Switch checkedChildren="Bàn trống" unCheckedChildren="Bàn full" defaultChecked />
            </Form.Item>

          

            <Form.Item>
                <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </>
);
  
}

export default CreateTable