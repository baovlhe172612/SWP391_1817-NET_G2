import { Button, Form, Input, InputNumber, Select, Switch } from "antd";

const { Option } = Select;

function CreateStore() {
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
                name="create-room"
                onFinish={handleSubmit}
                form={form}
               
            >
                <Form.Item
                    label="Strore name"
                    name="storeName"
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
                    label="Location"
                    name="location"
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
                    name="utils"
                    label="AccoutName"
                    rules={[{ required: true, message: 'Please select the utilities!' }]}
                >
                    <Select allowClear placeholder="Select your utilities">
                        <Option value="Wifi">Wifi</Option>
                        <Option value="Nóng Lạnh">Nóng Lạnh</Option>
                        <Option value="Điều hoà">Điều hoà</Option>
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