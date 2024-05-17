import React from 'react'

function Contact() {
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
                                    <a href="tel://123-456-789">123 456 789</a>
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
                        <form id="contact-form" className="contact-form"
                            action="https://htmlmail.hasthemes.com/mamunur/pronia.php">
                            <div className="group-input">
                                <div className="form-field me-lg-30 mb-35 mb-lg-0">
                                    <input type="text" name="con_firstName" id="con_firstName"
                                        placeholder="First Name*" className="input-field" autocomplete="off"/>
                                </div>
                                <div className="form-field mb-35">
                                    <input type="text" name="con_lastName" id="con_lastName"
                                        placeholder="Last Name*" className="input-field" autocomplete="off"/>
                                </div>
                            </div>
                            <div className="group-input mb-35">
                                <div className="form-field me-lg-30 mb-35 mb-lg-0">
                                    <input type="text" name="con_phone" id="con_phone" placeholder="Phone*"
                                        className="input-field" autocomplete="off"/>
                                </div>
                                <div className="form-field">
                                    <input type="text" name="con_email" id="con_email" placeholder="Email*"
                                        className="input-field" autocomplete="off"/>
                                </div>
                            </div>
                            <div className="form-field mb-5">
                                <textarea name="con_message" id="con_message" placeholder="Message"
                                    className="textarea-field"></textarea>
                            </div>
                            <div className="contact-button-wrap">
                                <button type="submit" value="submit"
                                    className="btn btn btn-custom-size xl-size btn-pronia-primary"
                                    name="submit">Post
                                    Comment</button>
                                <p className="form-messege mb-0"></p>
                            </div>
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