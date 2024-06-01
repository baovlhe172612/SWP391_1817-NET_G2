import React from "react";
import { Button, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function Status({handleStatus}) {
  const items = [
    {
      label: <Link to={`/admin/store?status=1`}>Active</Link>,
      key: 0,
    },
    {
      label: <Link to={`/admin/store?status=0`}>Inactive</Link>,
      key: 1,
    },
  ];
  return (
    <>
      <Dropdown
        menu={{
          items,
        }}
        trigger={["click"]}
      >
        <Button size="large">
          Status
          <DownOutlined />
        </Button>
      </Dropdown>
    </>
  );
}

export default Status;
