import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import {
  DashboardOutlined,
  AppstoreAddOutlined,
  UserAddOutlined,
  TableOutlined,
  UserOutlined,
  RadarChartOutlined,
  ShoppingCartOutlined,
  ProductOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import itemsSider from "./Sider";

function MenuSider() {
  const account = useSelector((state) => state.AccountReducer);
  const [openKeys, setOpenKeys] = useState([]);

  // Lấy các giá trị của thanh sider từ hàm trả về
  const item2 = itemsSider(account);

  // set lại giá trị mặc định của sider 3 khi đăng nhap
  useEffect(() => {
    if (account.roleId === 3) {
      setOpenKeys(["table/listStore"]);
    } else {
      setOpenKeys(["DashBoard1"]);
    }
  }, [account.roleId]);

  return (
    <>
      <Menu
        mode="inline"
        // chắc chắn thằng item2 phải là hàm
        items={Array.isArray(item2) ? item2 : []}
        defaultOpenKeys={"DashBoard1"}
        // khi thanh sider 3 bị thay đổi chạy hàm này để defaultOpenkeys thay đôi
        onOpenChange={keys => setOpenKeys(keys)}
        defaultSelectedKeys={["/"]}
      />
    </>
  );
}
export default MenuSider;
