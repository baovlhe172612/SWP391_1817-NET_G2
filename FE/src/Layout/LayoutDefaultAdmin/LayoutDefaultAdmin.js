import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Layout } from "antd";

import "./LayoutDefault.css";
import logo from "../../assets/images/logo/dark.png";
import {
  SearchOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import MenuSider from "../../components/Admin/Menu/index";
import { Outlet } from "react-router-dom";
import { Footer } from "antd/es/layout/layout";
import Notify from "../../components/Admin/Notify";

const { Sider, Content } = Layout;

function LayoutDefaultAdmin() {
  const [collapsed, setCollapsed] = useState(true);
  const login = useSelector((state) => state.LoginReducer);

  useEffect(() => {
    if (!login) {
      setCollapsed(!collapsed);
    }
  }, [login]);

  return (
    <>
      <Layout className="layout-default">
        {/* header */}
        <header className="header">
          <div
            className={
              "header__logo " + (collapsed && "header__logo--collapsed")
            }
          >
            {/* <img src={collapsed ? logo_fold : logo} alt="logo" /> */}
            <img src={logo} alt="logo" />
          </div>

          <div className="header__nav">
            <div className="header__nav-left">
              <div
                className="header__collapse"
                onClick={() => setCollapsed(!collapsed)}
              >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                {/* <MenuFoldOutlined /> */}
              </div>

              <div className="header__search">
                <SearchOutlined />
              </div>
            </div>

            <div className="header__nav-right">
              <Notify />
            </div>
          </div>
        </header>

        {/* Layout */}
        <Layout>
          {/* login == true => mới có sider */}
          {login ? (
            <Sider className="slider" collapsed={collapsed} theme="light">
              {<MenuSider />}
            </Sider>
          ) : (
            <></>
          )}
          <Content className="content">
            <Outlet />
          </Content>
        </Layout>
      </Layout>

      {/* FOOTER */}
      <Footer>footer</Footer>
    </>
  );
}

export default LayoutDefaultAdmin;
