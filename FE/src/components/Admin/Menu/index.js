import { Menu } from "antd";
import { useEffect, useState } from "react";
import itemsSider from "./Sider";
import { useDispatch } from "react-redux";
import { siderActions } from "../../../actions/Sider.action";

function MenuSider({account, selectedKey, openKey}) {
  const dispatch = useDispatch();
  // Lấy các giá trị của thanh sider từ hàm trả về
  const item2 = itemsSider(account);

  const handleSelect =(e) => {
    // lấy ra keyPath : ['listStore', 'Store']
    const [selectedKeyFromSelected, openKeyFromSelect] = e.keyPath
    // lưu lên redux các Actions mà user muốn đi tới
    dispatch(siderActions({
      selectedKey: [selectedKeyFromSelected],
      openKey: [openKeyFromSelect]
    }))
    // console.log(e)
  }
  
  return (
    <>
      <Menu
        id='menuRef'
        mode="inline"
        // chắc chắn thằng item2 phải là hàm
        items={Array.isArray(item2) ? item2 : []}

        onSelect={handleSelect}
        // Sider con được chọn
        selectedKeys={selectedKey}
        // Sider ba được chọn
        openKey={openKey}

        // mặc định khi mới vào
        defaultOpenKeys={openKey}
        defaultSelectedKeys={selectedKey}
      />
    </>
  );
}
export default MenuSider;
