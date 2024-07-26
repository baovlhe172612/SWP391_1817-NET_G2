import { Select } from "antd";
import { useState } from "react";

const { Option } = Select;

function Sort({ handleSortCondition, conditionSort }) {
  return (
    <Select
    //   value={conditionSort}
      onChange={handleSortCondition}
      placeholder="Select a sort"
      style={{ width: 200 }} // Thêm style để điều chỉnh kích thước dropdown
    >
      <Option key={1} value="1">Sort by Default</Option>
      <Option key={2} value="2">Sort by Name</Option>
      <Option key={3} value="3">Sort by High Price</Option>
      <Option key={4} value="4">Sort by Low Price</Option>
    </Select>
  );
}

export default Sort;
