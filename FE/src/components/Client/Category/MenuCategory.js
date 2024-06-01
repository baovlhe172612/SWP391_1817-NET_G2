import React, { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import { get } from "../../../helpers/API.helper";
import { Link } from "react-router-dom";

function MenuCategory({categories}) {

  const items = categories.map((data, index) => {
    return {
      // thêm logic gì đó ở đây
      label: <Link to={`http://localhost:3000/listProduct?categoryId=${data.categoryId}`}>{data.categoryName}</Link>,
      key: index,
    };
  });

  return (
    <>
      <Dropdown
        menu={{
          items,
        }}
        trigger={["click"]}
      >
        <Button size="large">
            BROWSE
          <DownOutlined />
        </Button>
      </Dropdown>
    </>
  );
}

export default MenuCategory;
