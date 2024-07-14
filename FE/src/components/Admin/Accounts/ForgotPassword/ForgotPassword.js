import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { Form, Input, Button, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

import './ForgotPassword.scss';
import { setCookie } from '../../../../helpers/Cookie.helper';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [messageText, setMessageText] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        // Fetch account details from the API
        try {
            const response = await axios.get(`http://localhost:5264/api/AccountDtos/GetByEmail?email=${email}`);
            const accountData = response.data;
            if (!accountData) {
                message.error('Account not found with this email!');
                return;
            }

          
            // Prepare OTP data
            const serviceId = 'service_barainv';
            const templateId = 'template_k3bybh9';
            const publickey = 'bHnNogHrf4QMx_JLw';
            const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP

            const data = {
                service_id: serviceId,
                template_id: templateId,
                user_id: publickey,
                template_params: {
                    from_name: 'Anh bán trà sữa', // Replace with an actual name
                    from_email: 'datldhe171371@fpt.edu.vn',
                    to_email: email,
                    to_name: accountData.fullName, // Replace with actual full name from accountData
                    message: `Your OTP code is: ${otp}`, // Send OTP in the message
                },
            };

            // Send OTP email
            await axios.post('https://api.emailjs.com/api/v1.0/email/send', data);
            message.success('OTP has been sent to your email!');

            // Store OTP for validation later (or handle OTP logic as needed)
            localStorage.setItem('otp', otp);
            setCookie('accId', accountData.accountId,1);

            // Redirect to OTP confirmation page
            navigate('/admin/confirm-otp');
        } catch (error) {
            console.error('Error:', error);
            message.error('Failed to send OTP or fetch account details.');
        }
    };

    return (
        <div className="container">
            <div className="signin-content">
                {/* FORM */}
                <div className="signin-form">
                    <h2 className="form-title">Forgot Password</h2>
                    <Form
                        name="email"
                        onFinish={handleSubmit}
                        className="register-form"
                        id="login-form"
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    type: 'email',
                                    message: 'Please input a valid Email!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                placeholder="Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Send OTP
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

                {/* IMAGE */}
                <div className="signin-image">
                    <figure>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/vi/2/2d/Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_FPT.svg"
                            alt="sign in"
                        />
                    </figure>
                    {/* LINK */}
                    <Link className="signup-image-link" to="/admin/login">
                        Have an account?
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
