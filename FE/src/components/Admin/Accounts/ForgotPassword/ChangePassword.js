import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './ChangePassword.scss'; // Import file CSS
import { getCookie } from '../../../../helpers/Cookie.helper';
import { LOCALHOST_API } from '../../../../helpers/APILinks';
import CryptoJS from 'crypto-js';
const ChangePassword = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);

        const { newPassword, confirmPassword } = values;
        const userId = getCookie('accId');
        console.log(userId);
        if (newPassword !== confirmPassword) {
            message.error('New password and confirm password do not match!');
            setLoading(false);
            return;
        }
        const passwordMd5 = CryptoJS.MD5(newPassword.trim()).toString().trim();

        try {
            const response = await fetch(`${LOCALHOST_API}/api/Account/${userId}/password?newPassword=${passwordMd5}`, {
                method: 'PUT'
            });

            if (response.ok) {
                message.success('Password changed successfully!');
                navigate('/admin/login');
            } else {
                message.error('Failed to change password!');
            }
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
                >
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
