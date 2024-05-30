import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Button } from "antd";

import "./LayoutDefault.css";
import logo from "../../assets/images/logo/dark.png";
import {
  SearchOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import MenuSider from "../../components/Admin/Menu/index";
import { Link, Outlet } from "react-router-dom";
import { Footer } from "antd/es/layout/layout";
import Notify from "../../components/Admin/Notify";
import { getSessionItem } from "../../helpers/Session.helper";

const { Sider, Content } = Layout;

function LayoutDefaultAdmin() {
  const [collapsed, setCollapsed] = useState(true);
  // lấy login + account từ redux
  const login = useSelector((state) => state.LoginReducer);
  //
  const dispatch = useDispatch();

  useEffect(() => {
    if (!login) {
      setCollapsed(false);
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
              {/* BTN LOGIN/LOGOUT/USER */}
              {login ? (
                <>
                  <Button
                    type="primary"
                    icon={<UserOutlined />}
                    style={{
                      margin: "0 8px",
                      backgroundColor: "#abd373",
                      borderColor: "#abd373",
                    }}
                  >
                    User
                  </Button>
                  {/* LOGOUT */}
                  <Link to="/admin/logout">
                    <Button
                      type="primary"
                      icon={<LogoutOutlined />}
                      style={{
                        margin: "0 8px",
                        backgroundColor: "#ff4d4f",
                        borderColor: "#ff4d4f",
                      }}
                    >
                      Logout
                    </Button>
                  </Link>
                </>
              ) : (
                <Link to="/admin/login">
                  <Button
                    type="primary"
                    icon={<LoginOutlined />}
                    style={{ margin: "0 8px" }}
                  >
                    Login
                  </Button>
                </Link>
              )}
              {/* NOTIFY */}
              <span>
                <Notify />
              </span>
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
            <div className="content_header">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>

      {/* FOOTER */}
      <Footer>footer</Footer>
    </>
  );
}

export default LayoutDefaultAdmin;
