import React from 'react'

function Checkout() {
  return (
    <>
    {/* <!-- Begin Main Content Area --> */}
    <main className="main-content">
         <div className="breadcrumb-area breadcrumb-height" data-bg-image="assets/images/breadcrumb/bg/1-1-1919x388.jpg">
            <div className="container h-100">
                <div className="row h-100">
                    <div className="col-lg-12">
                        <div className="breadcrumb-item">
                            <h2 className="breadcrumb-heading">Checkout Page</h2>
                            <ul>
                                <li>
                                    <a href="home">Home</a>
                                </li>
                                <li>Checkout</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        <form action="checkout" method="POST">
        <div className="checkout-area section-space-y-axis-100">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="coupon-accordion">
                            <h3>Returning customer? <span id="showlogin">Click here to login</span></h3>
                            <div id="checkout-login" className="coupon-content">
                                <div className="coupon-info">
                                    <p className="coupon-text mb-1">Quisque gravida turpis sit amet nulla posuere
                                        lacinia. Cras
                                        sed est
                                        sit amet ipsum luctus.</p>
                                    <form action="javascript:void(0)">
                                        <p className="form-row-first">
                                            <label className="mb-1">Username or email <span
                                                    className="required">*</span></label>
                                            <input type="text"/>
                                        </p>
                                        <p className="form-row-last">
                                            <label>Password <span className="required">*</span></label>
                                            <input type="text"/>
                                        </p>
                                        <p className="form-row">
                                            <input type="checkbox" id="remember_me"/>
                                            <label for="remember_me">Remember me</label>
                                        </p>
                                        <p className="lost-password"><a href="#">Lost your password?</a></p>
                                    </form>
                                </div>
                            </div>
                            <h3>Have a coupon? <span id="showcoupon">Click here to enter your code</span></h3>
                            <div id="checkout_coupon" className="coupon-checkout-content">
                                <div className="coupon-info">
                                    <form action="javascript:void(0)">
                                        <p className="checkout-coupon">
                                            <input placeholder="Coupon code" type="text"/>
                                            <input className="coupon-inner_btn" value="Apply Coupon" type="submit"/>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <% User user = (User) request.getAttribute("user");%> */}
                <div className="row">
                    <div className="col-lg-6 col-12">

                            {/* <div className="checkbox-form">
                                <h3>Billing Details</h3>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="checkout-form-list">
                                            <label>Country <span className="required">*</span></label>
                                                <select className="myniceselect nice-select wide">
                                                    <option data-display="Bangladesh">Bangladesh</option>
                                                    <option value="uk">London</option>
                                                    <option value="rou">Romania</option>
                                                   <option value="fr">French</option>
                                                   <option value="de">Germany</option>
                                                    <option value="aus">Australia</option>
                                               </select>
                                            <input placeholder="" name="country" type="text"  required/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="checkout-form-list">
                                            <label>First Name <span className="required">*</span></label>
                                            <input placeholder="" name="firstName" type="text" value="<%=user.getFirstName()%>" required/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="checkout-form-list">
                                            <label>Last Name <span className="required">*</span></label>
                                            <input placeholder="" name="lastName" type="text" value="<%=user.getLastName()%>" required/>
                                        </div>
                                    </div>
                                        <div className="col-md-12">
                                           <div className="checkout-form-list">
                                               <label>Company Name</label>
                                                <input placeholder="" type="text" value=""/>
                                           </div>
                                        </div>
                                    <div className="col-md-12">
                                        <div className="checkout-form-list">
                                            <label>Address <span className="required">*</span></label>
                                            <input placeholder="Street address" name="streetAddress" type="text" value="<%=user.getStreetAddress()%>" required/>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="checkout-form-list">
                                            <label> Apartment </label>
                                            <input placeholder="Apartment, suite, unit etc. (optional)" name="apartment" type="text" value="<%=user.getApartment()%>" required/>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="checkout-form-list">
                                            <label>Town / City <span className="required">*</span></label>
                                            <input name="city" type="text" value="<%=user.getCity()%>" required/>
                                        </div>
                                    </div>
                                        <div className="col-md-6">
                                          <div className="checkout-form-list">
                                                <label>State / County <span className="required">*</span></label>
                                               <input placeholder="" name="country" type="text" value="<%=user.getCountry()%>" required/>
                                            </div>
                                       </div>
                                        <div className="col-md-6">
                                            <div className="checkout-form-list">
                                                <label>Postcode / Zip <span className="required">*</span></label>
                                                <input placeholder="" name="postcode" type="text" value="<%=user.getPostcode()%>" required/>
                                            </div>
                                      </div>
                                    <div className="col-md-6">
                                        <div className="checkout-form-list">
                                            <label>Email Address <span className="required">*</span></label>
                                            <input placeholder="" name="emailAddress" type="email" value="<%=user.getEmailAddress()%>" required/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="checkout-form-list">
                                            <label>Phone <span className="required">*</span></label>
                                            <input type="text" name="phone" value="<%=user.getPhone()%>" required/>
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                    </div>
                    <div className="" >
                        <div className="your-order">
                            <h3>Your order</h3>
                            {/* <% CartDTO cartDTO = (CartDTO) request.getAttribute("cart");%> */}
                            <div className="your-order-table table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th className="cart-product-name">Product</th>
                                            <th className="cart-product-total">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {/* <% for(CartDetailDTO cartDetailDTO : cartDTO.getCartDetails()) {%> */}
                                        <tr className="cart_item">
                                            <td className="cart-product-name"><strong
                                                    className="product-quantity">
                                                    </strong></td>
                                            <td className="cart-product-total"><span className="amount"></span></td>
                                        </tr>
                                            <tr className="cart_item">
                                               <td className="cart-product-name"> Vestibulum suscipit<strong
                                                        className="product-quantity">
                                                       × 1</strong></td>
                                                <td className="cart-product-total"><span className="amount">$165.00</span></td>
                                            </tr>
                                    
                                    </tbody>
                                    <tfoot>
                                            <tr className="cart-subtotal">
                                                <th>Cart Subtotal</th>
                                                <td><span className="amount"></span></td>
                                            </tr>
                                        <tr className="order-total">
                                            <th>Order Total</th>
                                            <td><strong><span className="amount"></span></strong></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <div className="payment-method">
                                <div className="payment-accordion">
                                    <div id="accordion">
                                        <div className="card">
                                            <div className="card-header" id="#payment-1">
                                                <h5 className="panel-title">
                                                    <a href="#" className="" data-bs-toggle="collapse"
                                                        data-bs-target="#collapseOne" aria-expanded="true">
                                                        Direct Bank Transfer.
                                                    </a>
                                                </h5>
                                            </div>
                                            <div id="collapseOne" className="collapse show" data-bs-parent="#accordion">
                                                <div className="card-body">
                                                    <p>Make your payment directly into our bank account. Please use
                                                        your
                                                        Order
                                                        ID as the payment
                                                        reference. Your order won’t be shipped until the funds have
                                                        cleared
                                                        in
                                                        our account.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-header" id="#payment-2">
                                                <h5 className="panel-title">
                                                    <a href="#" className="collapsed" data-bs-toggle="collapse"
                                                        data-bs-target="#collapseTwo" aria-expanded="false">
                                                        Cheque Payment
                                                    </a>
                                                </h5>
                                            </div>
                                            <div id="collapseTwo" className="collapse" data-bs-parent="#accordion">
                                                <div className="card-body">
                                                    <p>Make your payment directly into our bank account. Please use
                                                        your
                                                        Order
                                                        ID as the payment
                                                        reference. Your order won’t be shipped until the funds have
                                                        cleared
                                                        in
                                                        our account.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-header" id="#payment-3">
                                                <h5 className="panel-title">
                                                    <a href="#" className="collapsed" data-bs-toggle="collapse"
                                                        data-bs-target="#collapseThree" aria-expanded="false">
                                                        PayPal
                                                    </a>
                                                </h5>
                                            </div>
                                            <div id="collapseThree" className="collapse" data-bs-parent="#accordion">
                                                <div className="card-body">
                                                    <p>Make your payment directly into our bank account. Please use
                                                        your
                                                        Order
                                                        ID as the payment
                                                        reference. Your order won’t be shipped until the funds have
                                                        cleared
                                                        in
                                                        our account.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="order-button-payment">
                                        <input value="Place order" type="submit"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </form>
    </main>
    {/* <!-- Main Content Area End Here --> */}
</>
  )
}

export default Checkout