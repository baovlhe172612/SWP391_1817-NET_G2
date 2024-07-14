import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import './ChangePassword.scss'; // Import file CSS

const ChangePassword = () => {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        // Giả lập gửi yêu cầu đổi mật khẩu
        setLoading(true);

        const { oldPassword, newPassword, confirmPassword } = values;

        if (newPassword !== confirmPassword) {
            message.error('New password and confirm password do not match!');
            setLoading(false);
            return;
        }

        try {
            // Gửi yêu cầu đổi mật khẩu (API giả lập)
            // Ví dụ: await axios.post('http://localhost:5264/api/ChangePassword', { oldPassword, newPassword });

            message.success('Password changed successfully!');
        } catch (error) {
            console.error('Error:', error);
            message.error('Failed to change password!');
        }

        setLoading(false);
    };

    return (
        <div className="change-password-container">
            <div className="change-password-form">
                <h2 className="form-title">Change Password</h2>
                <Form
                    name="change-password"
                    onFinish={onFinish}
                    className="form"
                    initialValues={{ remember: true }}
                >
                    <Form.Item
                        name="oldPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your old password!',
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Old Password"
                        />
                    </Form.Item>

                    <Form.Item
                        name="newPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your new password!',
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="New Password"
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your new password!',
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Confirm New Password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                        >
                            Change Password
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default ChangePassword;
