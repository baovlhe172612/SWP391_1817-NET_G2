import React, { useEffect, useRef, useState } from 'react'
import { Carousel, Col, DatePicker, Input, Row } from 'antd'
import { get, post } from '../../../helpers/API.helper';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import './Contact.css'
import { UserOutlined, CommentOutlined, CalendarOutlined } from '@ant-design/icons';
import { Steps } from 'antd';

import {LIST_FEEDBACK } from '../../../helpers/APILinks';
const { RangePicker } = DatePicker;

const { Step } = Steps; // Lấy Step từ Steps



function Contact() {
    const [data, setData] = useState({});
    const [showModal, setShowModal] = useState(false);
    // const customStyles = {
    //     content: {
    //         top: '50%',
    //         left: '50%',
    //         right: 'auto',
    //         bottom: 'auto',
    //         marginRight: '-50%',
    //         transform: 'translate(-50%, -50%)',
    //     },
    // };
    const [feedbackList, setFeedbackList] = useState([]);
    const [currentFeedbackIndex, setCurrentFeedbackIndex] = useState(0); // Chỉ số của feedback hiện tại

    useEffect(() => {
        loadFeedbackList();
    }, []);



    const loadFeedbackList = async () => {
        try {
            const response = await get(LIST_FEEDBACK); // Điều chỉnh URL theo cấu trúc backend của bạn
            console.log("response", response);
            if (response) {
                const filteredFeedbacks = response.filter(feedback => feedback.isDelete === 0); // Lọc feedback có isDelete = 0
                console.log("filteredFeedbacks", filteredFeedbacks);
                setFeedbackList(filteredFeedbacks);
            }
        } catch (error) {
            console.error('Failed to load feedback:', error);
        }
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        // US English uses month-day-year order
        // console.log(date.toLocaleDateString('en-US'));
        // → "12/20/2012"

        // British English uses day-month-year order
        // console.log(date.toLocaleDateString('en-GB'));
        // → "20/12/2012"
        return date.toLocaleDateString('en-GB');
    };

    const handleChangeInput = (e) => {
        console.log("e.target.name", e.target.name)
        console.log(e.target.value)
        const objectNew = {
            ...data,
            [e.target.name]: e.target.value
        }
        setData(objectNew);

    }
    const handleChangeDate = (dates, dateStrings) => {
        // console.log(dates);
        console.log(dateStrings);
        const objectNew = {
            ...data,
            CreateDate: dateStrings
        };
        setData(objectNew);
    }



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("data in handlesubmit: ", data)
            // Send data to the backend
            const response = await post(LIST_FEEDBACK, data);
            if (response) {

                setShowModal(false);
                await Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Seen FeedBack sucessfully",
                    showConfirmButton: false,
                    timer: 1000
                });
                setTimeout(() => {
                    loadFeedbackList();
                    onReload();
                    setData({});
                }, 1000);
                setData({});
            }
            console.log('Form submitted successfully:', response);
            // alert('Form submitted successfully!');
            // Optionally reset the form

        } catch (error) {
            // console.error('Error submitting the form:', error);
            alert('Failed to submit the form.');
        }
    };
    const onReload = () => {
        window.location.reload();
    };
    console.log("data: ", data);

    const [currentStep, setCurrentStep] = useState(1); // State to track current step

    const handleStepChange = (step) => {
        setCurrentStep(step); // Update current step
    };

  
    return (
        <>         
            <main className="main-content">
                <div className="breadcrumb-area breadcrumb-height" data-bg-image="assets/images/breadcrumb/bg/1-1-1919x388.jpg">
                    <div className="container h-100">
                        <div className="row h-100">
                            <div className="col-lg-12">
                                <div className="breadcrumb-item">
                                    <h2 className="breadcrumb-heading">FeedBack</h2>
                                    <ul>
                                        <li>
                                            <a href="/">Home</a>
                                        </li>
                                        <li>Give us feedback</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="contact-form-area section-space-y-axis-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="feedback-list">
                                    {feedbackList.length > 0 && (
                                        <Carousel autoplay effect="scrollx" dotPosition="bottom" autoplaySpeed={3000}>
                                            {feedbackList.map((feedback, index) => (
                                                <div key={index} className="feedback-item">
                                                    <h2>List FeedBack </h2>
                                                    <h3><UserOutlined /> Author: {feedback.author}</h3>
                                                    <p><CommentOutlined /> FeedBack: {feedback.messengerDescription}</p>
                                                    <p><CalendarOutlined /> Date: {formatDate(feedback.createDate)}</p>
                                                </div>
                                            ))}
                                        </Carousel>
                                    )}
                                </div>

                                <div className="contact-wrap">
                                    <div className="contact-info text-white"
                                        data-bg-image="assets/images/contact/1-1-370x500.jpg">
                                        <h2 className="contact-title">Contact Info:</h2>
                                        <p className="contact-desc">Fill the form amd our teaam will get to back
                                            to you within 24 hours.
                                        </p>
                                        <ul className="contact-list">
                                            <li>
                                                <i className="pe-7s-call"></i>
                                                <a href="tel://123-456-789">09XX XXX XXX</a>
                                            </li>
                                            <li>
                                                <i className="pe-7s-mail"></i>
                                                <a href="mailto://info@example.com">info@example.com</a>
                                            </li>
                                            <li>
                                                <i className="pe-7s-map-marker"></i>
                                                <span>13, Your Address, Here</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <form onSubmit={handleSubmit} id="contact-form" className="contact-form">
                                        <Row gutter={[20, 20]}>

                                            <Col style={{ marginBottom: '20px' }} span={24}>
                                                <p>Author:</p>
                                                <Input required name="Author" placeholder="Enter the name+email+phone" onChange={handleChangeInput} />
                                            </Col>
                                            <Col style={{ marginBottom: '20px' }} span={24}>
                                                <p style={{ marginTop: '20px' }}>Messenger</p>
                                                <Input required name="MessengerDescription" placeholder="Enter the MessengerDescription" onChange={handleChangeInput} />
                                            </Col>
                                            <Col style={{ marginTop: '20px' }} span={12}>
                                                <p style={{ marginTop: '20px' }}>Select date</p>
                                                <DatePicker required onChange={handleChangeDate} />
                                            </Col>
                                            <Col span={24}>
                                                <div className="contact-button-wrap">
                                                    <button type="submit" value="submit" className="btn btn-custom-size xl-size btn-pronia-primary" name="submit" style={{ border: "1px solid" }}>
                                                        Post FeedBack
                                                    </button>

                                                </div>
                                            </Col>
                                        </Row>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="contact-map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.5063419425255!2d105.52271427508036!3d21.012416680632775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abc60e7d3f19%3A0x2be9d7d0b5abcbf4!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1716553158973!5m2!1svi!2s"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>

                </div>

            </main>
        </>
    )
}

export default Contact