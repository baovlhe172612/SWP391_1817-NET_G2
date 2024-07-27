import React, { useState } from "react";
import { Menu, Dropdown, Button } from "antd";
import { Link } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";

function MenuCategory({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleMenuClick = (e) => {
    setSelectedCategory(e.key);
    // Thực hiện hành động khi giá trị được chọn thay đổi
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="default">
        <Link to={`/listProduct`}>
          Default
        </Link>
      </Menu.Item>
      {categories.map((data) => (
        <Menu.Item key={data.categoryName}>
          <Link to={`/listProduct?categoryId=${data.categoryId}`}>
            {data.categoryName}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <Button size="large">
        {selectedCategory ? `Selected: ${selectedCategory}` : "Select a category"} <DownOutlined />
      </Button>
    </Dropdown>
  );
}

export default MenuCategory;
