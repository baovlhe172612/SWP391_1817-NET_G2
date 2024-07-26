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
      

        <Form
            name="create-table"
            onFinish={handleSubmit}
            form={form}
           
        >
            <Form.Item
                label="Table Name"
                name="tableName"
                rules={[
                    {
                        required: true,
                        message: 'Please input your table name!',
                    },
                    {
                        validator(_, value) {
                            // Example regex: allows letters, spaces, hyphens, and apostrophes, and must be at least 2 characters long
                            const fullNameRegex = /^[a-zA-Z\s'-]{2,}$/;
                            if (!value) {
                                return Promise.resolve(); // If the field is empty, let the 'required' rule handle it
                            }
                            if (!fullNameRegex.test(value)) {
                                return Promise.reject('table name must be at least 2 characters long and can only include letters, spaces, hyphens, and apostrophes.');
                            }
                            if(value.trim()===""){
                              return Promise.reject('table Name needs charaters!');
                            }
                            return Promise.resolve();
                        },
                    },
                ]}                
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="isDelete"
                label="Status"
                valuePropName="checked"
                initialValue={true} // Giá trị mặc định là Còn phòng
            >
                <Switch checkedChildren="Empty" unCheckedChildren="Full" defaultChecked />
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