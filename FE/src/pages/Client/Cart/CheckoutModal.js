import React, { useState } from 'react';
import { Modal, Button, Form, Input, Select } from 'antd';


function CheckoutModal({ isVisible, handleOk, handleCancel }){
    const [form] = Form.useForm();

  return (
    <Modal
    title="Create New Product"
    visible={isVisible}
    onOk={form.submit && handleOk}
    onCancel={handleCancel}   
    >
        <Form>
            <div>form checkout</div>       
        </Form>
        
    </Modal>
  );
}

export default CheckoutModal;
