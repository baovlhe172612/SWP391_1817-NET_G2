import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";

function Sort({ handleSortCondition, conditionSort }) {
  const [selectedSort, setSelectedSort] = useState(conditionSort || null);
  const handleMenuClick = (e) => {
    setSelectedSort(e.key);
    handleSortCondition(e.key);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">
        Sort by Default
      </Menu.Item>
      <Menu.Item key="2">
        Sort by Name
      </Menu.Item>
      <Menu.Item key="3">
        Sort by High Price
      </Menu.Item>
      <Menu.Item key="4" >
        Sort by Low Price
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <Button size="large">
        {selectedSort ? `Selected: ${menu.props.children[selectedSort - 1].props.children}` : "Select a sort"} <DownOutlined />
      </Button>
    </Dropdown>
  );
}

export default Sort;
