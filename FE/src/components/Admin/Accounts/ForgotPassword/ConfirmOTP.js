import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import './ConfirmOTP.css'; // Import file CSS
import { getCookie } from '../../../../helpers/Cookie.helper';
import { LOCALHOST_API } from '../../../../helpers/APILinks';

const ConfirmOTP = () => {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        const storedOtp = localStorage.getItem('otp');
        const userId = getCookie('accId');
        console.log(userId);
        if (otp === storedOtp) {
            // Call API to delete the password (assuming this is the right endpoint)
            try {
                await fetch(`${LOCALHOST_API}/api/Account/${userId}/password`, {
                    method: 'DELETE'
                });
                message.success('OTP verified successfully! Please set your new password.');
                navigate('/admin/change-password');
            } catch (error) {
                message.error('Failed to delete the password. Please try again.');
            }
        } else {
            message.error('Invalid OTP!');
        }
    };

    return (
        <div className="container">
            <div className="confirm-otp-content">
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
