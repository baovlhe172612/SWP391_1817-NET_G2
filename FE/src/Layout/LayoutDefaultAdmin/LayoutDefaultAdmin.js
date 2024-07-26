import { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Layout, Button, message } from "antd";
import * as signalR from "@microsoft/signalr";

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
import Footer from "./Footer/Footer";
import Notify from "../../components/Admin/Notify";
import { getSessionItem } from "../../helpers/Session.helper";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { connectActions } from "../../actions/connection.actions";
import { CHAT_API } from "../../helpers/APILinks";
import NotifyChat from "./NotifyChat/NotifyChat";

const { Sider, Content } = Layout;

function LayoutDefaultAdmin() {
  const [collapsed, setCollapsed] = useState(true);
  const [connection, setConnection] = useState(null);
  // lấy login + account từ redux
  const login = useSelector((state) => state.LoginReducer);
  const { selectedKey, openKey } = useSelector((state) => state.SiderReducer);
  const account = useSelector((state) => state.AccountReducer);

  //
  const dispatch = useDispatch();

  // kết nối với server
  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${CHAT_API}`)
      .withAutomaticReconnect()
      .build();

    dispatch(connectActions(newConnection));

    setConnection(newConnection);
  }, []);

  // lắng nghe sự thay đổi trong server
  useEffect(() => {
    if (connection) {
      connection
        .start() // bắt đầu kết nối
        .then((result) => {
          console.log("Connected!", result);
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection]);

  useEffect(() => {
    if (login == true) {
      setCollapsed(false);
    } else {
      setCollapsed(true);
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
            <Link to="http://localhost:3000/admin/dashboard"> <img src={logo} alt="logo" /></Link>
            {/* <img src={collapsed ? logo_fold : logo} alt="logo" /> */}
           
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

              {/* <div className="header__search">
                <SearchOutlined />
              </div> */}
            </div>

            <div className="header__nav-right">
              {/* BTN LOGIN/LOGOUT/USER */}
              {login ? (
                <>
                  <Link to={`/admin/profile`}>
                    <Button
                      type="primary"
                      icon={<UserOutlined />}
                      style={{
                        margin: "0 8px",
                        backgroundColor: "#abd373",
                        borderColor: "#abd373",
                      }}
                    >
                      {account.fullName}
                    </Button>
                  </Link>
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
              {
                <MenuSider
                  account={account}
                  selectedKey={selectedKey}
                  openKey={openKey}
                />
              }
            </Sider>
          ) : (
            <></>
          )}
          <Content className="content">
            <div className="content_header">
              <NotifyChat account={account}/>
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
