import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import './ConfirmOTP.css'; // Import file CSS

const ConfirmOTP = () => {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        const storedOtp = localStorage.getItem('otp');

        if (otp === storedOtp) {
            message.success('OTP verified successfully!');
            // Redirect to the Change Password page
            navigate('/admin/change-password');
        } else {
            message.error('Invalid OTP!');
        }
    };

    return (
        <div className="container">
            <div className="confirm-otp-content">
                {/* FORM */}
                <div className="confirm-otp-form">
                    <h2 className="form-title">Confirm OTP</h2>
                    <Form
                        name="otp"
                        onFinish={handleSubmit}
                        className="otp-form"
                        id="otp-form"
                    >
                        <Form.Item
                            name="otp"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your OTP!',
                                },
                            ]}
                        >
                            <Input
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Confirm OTP
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default ConfirmOTP;
