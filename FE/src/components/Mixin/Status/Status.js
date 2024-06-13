import React from "react";
import { Button, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { get } from "../../../helpers/API.helper";
import { GET_STORES_STATUS } from "../../../helpers/APILinks";

function Status({ handleStatus }) {
  const changeStatus = (status) => {
    const fetchApi = async () => {
      try {
        const data = await get(
          `${GET_STORES_STATUS}/${status == "active" ? 1 : 0}`
        );

        console.log(data)
        //
        handleStatus(data)

      } catch (error) {}
    };

    fetchApi();
  };
  const items = [
    {
      label: <span onClick={() => changeStatus("active")}>Active</span>,
      key: 0,
    },
    {
      label: <span onClick={() => changeStatus("Inactive")}>Inactive</span>,
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
