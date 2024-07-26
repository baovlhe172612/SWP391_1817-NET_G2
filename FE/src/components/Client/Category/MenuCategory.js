import React, { useState } from "react";
import { Select } from "antd";
import { Link } from "react-router-dom";

const { Option } = Select;

function MenuCategory({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleChange = (value) => {
    setSelectedCategory(value);
    // Thực hiện hành động khi giá trị được chọn thay đổi
  };

  return (
    <Select
      style={{ width: 200 }} // Thêm style để điều chỉnh kích thước dropdown
      placeholder="Select a category"
      onChange={handleChange}
      value={selectedCategory}
    >
      <Option key={0}>
          <Link to={`/listProduct`}>
            Default
          </Link>
        </Option>
      {categories.map((data, index) => (
        <Option key={index} value={data.categoryId}>
          <Link to={`/listProduct?categoryId=${data.categoryId}`}>
            {data.categoryName}
          </Link>
        </Option>
      ))}
    </Select>
  );
}

export default MenuCategory;
