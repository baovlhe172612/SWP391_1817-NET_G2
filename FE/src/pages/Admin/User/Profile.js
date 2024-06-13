import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Row, Col, Card } from "antd";
// import "antd/dist/antd.css";
import "./Profile.css";
import { put, putV2 } from "../../../helpers/API.helper";
import { UPDATE_ACCOUNT_ID } from "../../../helpers/APILinks";
import { alear_false, alear_success } from "../../../helpers/Alert.helper";
import { accountActions } from "../../../actions/AccountActions";

const { Item } = Form;

function Profile() {
  const account = useSelector((state) => state.AccountReducer);
  const dispatch = useDispatch();

  console.log(account)

  // SUBMIT
  const handleSubmit = async (values) => {
    const profileNewV1 = { ...account, ...values }

    console.log(profileNewV1)

    try {
      const dataPatch = await putV2(
        `${UPDATE_ACCOUNT_ID}`,
        profileNewV1
      );

      console.log(dataPatch)

      // dispatch(accountActions(dataPatch));

      if (dataPatch) {
        alear_success(`Update Success`, `updated`);
      } else {
      alear_false(`Update false`, `updated false`);
      }
    } catch (error) {
      console.log(error)
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
              {/* Form Group (username) */}
              <Item
                label={<span className="fixed-width-label">Full Name</span>}
                name="fullName"
                initialValue={account.fullName}
                rules={[
                  {
                    required: true,
                    message: "Please input your fullName!",
                  },
                ]}
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
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
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
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter your phone" />
                  </Item>
                </Col>
              </Row>
              {/* Form Group (email address) */}
              <Item
                label={<span className="fixed-width-label">Email Address</span>}
                name="email"
                initialValue={account.email}
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
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
                  >
                    <Input readOnly className="readonly-input" />
                  </Item>
                </Col>
                {/* Form Group (location) */}
                <Col span={12}>
                  <Item
                    label={<span className="fixed-width-label">Address</span>}
                    name="address"
                    initialValue={account.address}
                    rules={[
                      {
                        required: true,
                        message: "Please input your location!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter your location" />
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
              {/*  */}
              <Row gutter={16}>
                {/* Form Group (role name) */}
                <Col span={12}>
                  <Item
                    label={
                      <span className="fixed-width-label">Store Name</span>
                    }
                    name="storeName"
                    initialValue={account.storeName}
                  >
                    <Input readOnly className="readonly-input" />
                  </Item>
                </Col>
                {/* Form Group (location) */}
                <Col span={12}>
                  <Item
                    label={<span className="fixed-width-label">Cccd</span>}
                    name="cccd"
                    initialValue={account.cccd}
                    rules={[
                      {
                        required: true,
                        message: "Please input your cccd!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter your location" />
                  </Item>
                </Col>
              </Row>
              {/*  */}
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
