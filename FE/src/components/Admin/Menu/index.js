import { Menu } from "antd";
import { useEffect, useState } from "react";
import itemsSider from "./Sider";

function MenuSider({account}) {
  const [openKeys, setOpenKeys] = useState(["DashBoard"]);
  const [selectKeys, setSelectKeys] = useState(["DashBoard1"]);

  // Lấy các giá trị của thanh sider từ hàm trả về
  const item2 = itemsSider(account);

  // set lại giá trị mặc định của sider 3 khi đăng nhap
  useEffect(() => {
    if (account.roleId === 3) {
      setOpenKeys(["table"]);
      setSelectKeys(["listTable"]);
    }
  }, [account.roleId]);

  return (
    <>
      <Menu
        mode="inline"
        // chắc chắn thằng item2 phải là hàm
        items={Array.isArray(item2) ? item2 : []}
        // set giá trị mặc định phải là 1 MẢNG
        defaultOpenKeys={openKeys}
        // khi thanh sider 3 bị thay đổi chạy hàm này để defaultOpenkeys thay đôi
        onOpenChange={keys => setOpenKeys(keys)}
        defaultSelectedKeys={selectKeys}
      />
    </>
  );
}
export default MenuSider;
