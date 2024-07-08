import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Row, Col, Card } from "antd";
// import "antd/dist/antd.css";
import "./Profile.css";
import { get, put, putV2 } from "../../../helpers/API.helper";
import {
  GET_ACCOUNT_BY_TOKEN,
  UPDATE_ACCOUNT_ID,
} from "../../../helpers/APILinks";
import { alear_false, alear_success } from "../../../helpers/Alert.helper";
import { accountActions } from "../../../actions/AccountActions";

const { Item } = Form;

function Profile() {
  const account = useSelector((state) => state.AccountReducer);
  const dispatch = useDispatch();

  console.log(account);

  // Regex pattern to block whitespace
  const noWhitespacePattern = /^\S*$/;

  // Regex pattern to allow only numbers
  const onlyNumbersPattern = /^[0-9]+$/;

  // Common validation rules for input fields
  const commonRules = (fieldName) => [
    {
      required: true,
      message: `Please input your ${fieldName}!`,
    },
    {
      pattern: noWhitespacePattern,
      message: "Whitespace is not allowed!",
    },
  ];

  // Validation rules for phone field
  const phoneRules = [
    {
      required: true,
      message: "Please input your phone number!",
    },
    {
      pattern: onlyNumbersPattern,
      message: "Phone number must contain only numbers!",
    },
    {
      pattern: noWhitespacePattern,
      message: "Whitespace is not allowed!",
    },
  ];

  // Validation rules for email field
  const emailRules = [
    {
      required: true,
      message: "Please input your email address!",
    },
    {
      type: "email",
      message: "The input is not a valid email address!",
    },
    {
      pattern: noWhitespacePattern,
      message: "Whitespace is not allowed!",
    },
  ];

  // SUBMIT
  const handleSubmit = async (values) => {
    const profileNewV1 = { ...account, ...values };

    console.log(profileNewV1);

    try {
      const dataPatch = await putV2(`${UPDATE_ACCOUNT_ID}`, profileNewV1);

      if (dataPatch) {
        alear_success(`Update Success`, `updated`);

        const accountByToken = await get(
          `${GET_ACCOUNT_BY_TOKEN}/${dataPatch.token}`
        );
        console.log(accountByToken);

        dispatch(accountActions(accountByToken));
      } else {
        alear_false(`Update false`, `updated false`);
      }
    } catch (error) {
      console.log(error);
      alear_false(`Update false`, `updated false`);
    }
  };
  return (
    <div className="container-xl px-4 mt-4 body">
      {/* Account page navigation */}
      <div className="row">
        <div className="col-xl-12">
          {/* Account details card */}
          <Card title="Account Details" className="mb-4">
            <Form onFinish={handleSubmit}>
              {/* Form Group (full name) */}
              <Item
                label={<span className="fixed-width-label">Full Name</span>}
                name="fullName"
                initialValue={account.fullName}
                rules={commonRules("full name")}
              >
                <Input placeholder="Enter your full name" />
              </Item>
              {/* Form Row */}
              <Row gutter={16}>
                {/* Form Group (username) */}
                <Col span={12}>
                  <Item
                    label={<span className="fixed-width-label">Username</span>}
                    name="userName"
                    initialValue={account.userName}
                    rules={commonRules("username")}
                  >
                    <Input readOnly className="readonly-input" />
                  </Item>
                </Col>
                {/* Form Group (phone) */}
                <Col span={12}>
                  <Item
                    label={<span className="fixed-width-label">Phone</span>}
                    name="phone"
                    initialValue={account.phone}
                    rules={phoneRules}
                  >
                    <Input placeholder="Enter your phone number" />
                  </Item>
                </Col>
              </Row>
              {/* Form Group (email address) */}
              <Item
                label={<span className="fixed-width-label">Email Address</span>}
                name="email"
                initialValue={account.email}
                rules={emailRules}
              >
                <Input type="email" placeholder="Enter your email address" />
              </Item>
              {/* Form Row */}
              <Row gutter={16}>
                {/* Form Group (role name) */}
                <Col span={12}>
                  <Item
                    label={<span className="fixed-width-label">Role Name</span>}
                    name="roleName"
                    initialValue={account.roleName}
                    rules={commonRules("role name")}
                  >
                    <Input readOnly className="readonly-input" />
                  </Item>
                </Col>
                {/* Form Group (address) */}
                <Col span={12}>
                  <Item
                    label={<span className="fixed-width-label">Address</span>}
                    name="address"
                    initialValue={account.address}
                    rules={commonRules("address")}
                  >
                    <Input placeholder="Enter your address" />
                  </Item>
                </Col>
              </Row>
              {/* Form Group (date start work) */}
              {account.dateStartWork && (
                <Item
                  label={
                    <span className="fixed-width-label">Date Start Work</span>
                  }
                  name="dateStartWork"
                  initialValue={account.dateStartWork}
                >
                  <Input readOnly className="readonly-input" />
                </Item>
              )}
              {/* Form Row */}
              <Row gutter={16}>
                {/* Form Group (store name) */}
                <Col span={12}>
                  <Item
                    label={
                      <span className="fixed-width-label">Store Name</span>
                    }
                    name="storeName"
                    initialValue={account.storeName}
                    rules={commonRules("store name")}
                  >
                    <Input readOnly className="readonly-input" />
                  </Item>
                </Col>
                {/* Form Group (cccd) */}
                <Col span={12}>
                  <Item
                    label={<span className="fixed-width-label">CCCD</span>}
                    name="cccd"
                    initialValue={account.cccd}
                    rules={commonRules("CCCD")}
                  >
                    <Input placeholder="Enter your CCCD" />
                  </Item>
                </Col>
              </Row>
              {/* Save changes button */}
              <Item>
                <Button type="primary" htmlType="submit">
                  Save changes
                </Button>
              </Item>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Profile;
