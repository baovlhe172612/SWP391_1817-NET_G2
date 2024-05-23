import React, { useState } from 'react'
import { Col, DatePicker, Input, Row } from 'antd'
const { RangePicker } = DatePicker;


function Contact() {
    const [data, setData] = useState({});

    const handleChangeInput = (e) => {
        console.log(e.target.name)
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
            date: dateStrings
        };
        setData(objectNew);
    }
    console.log(data)
    // const handleChangeDate = (dates, dateStrings) => {
    //     // console.log(dates);
    //     console.log(dateStrings);
    //     const objectNew = {
    //         ...data,
    //         date: dateStrings
    //     };
    //     setData(objectNew);
    // }
    const handleSubmit = () => {

    }
    return (
        <>
            <main className="main-content">
                <div className="breadcrumb-area breadcrumb-height" data-bg-image="assets/images/breadcrumb/bg/1-1-1919x388.jpg">
                    <div className="container h-100">
                        <div className="row h-100">
                            <div className="col-lg-12">
                                <div className="breadcrumb-item">
                                    <h2 className="breadcrumb-heading">Contact</h2>
                                    <ul>
                                        <li>
                                            <a href="home">Home</a>
                                        </li>
                                        <li>Contact Us</li>
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
                                    <form onSubmit={handleSubmit} id="contact-form" className="contact-form" action="https://htmlmail.hasthemes.com/mamunur/pronia.php">
                                        <Row gutter={[20, 20]}>

                                            <Col span={24}>
                                                <p>Author:</p>
                                                <Input name="name" placeholder="Enter the name+email+phone" onChange={handleChangeInput} />
                                            </Col>
                                            <Col span={24}>
                                                <p>Messenger</p>
                                                <Input name="messenger" placeholder="Enter the [MessengerDescription]" onChange={handleChangeInput} />
                                            </Col>
                                            <Col span={12}>
                                                <p>Chọn ngày</p>
                                                <RangePicker placeholder={["Ngày đến", "Ngày đi"]} format="DD-MM-YYYY" onChange={handleChangeDate} />
                                            </Col>
                                            <Col span={24}>
                                                <div className="contact-button-wrap">
                                                    <button type="submit" value="submit" className="btn btn-custom-size xl-size btn-pronia-primary" name="submit">Post Comment</button>
                                                    <p className="form-messege mb-0"></p>
                                                </div>
                                            </Col>
                                        </Row>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contact-with-map">
                    <div className="contact-map">
                        <iframe className="contact-map-size"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1613802584124!5m2!1sen!2sbd"
                            allowfullscreen="" loading="lazy">
                        </iframe>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Contact