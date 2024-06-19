import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import FloatButtonMess from "./FloatBtn/FloatButtonMess";
import { useEffect, useState } from "react";
import Chat from "./Chat/Chat";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { getCookie } from "../../helpers/Cookie.helper";
import { CHAT_API } from "../../helpers/APILinks";

function LayoutDefault() {
  const [collapsed, setCollapsed] = useState(false);
  const [connection, setConnection] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const tableId = searchParams.get("tableId");

  // kết nối với server
  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${CHAT_API}`)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  // lắng nghe sự thay đổi trong server
  useEffect(() => {
    if (connection) {
      connection
        .start() // bắt đầu kết nối
        .then((result) => {
          console.log("Connected!");
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection]);

  const handleOnclick = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <Header tableId={tableId} />

      <div>
        {/* Button chat */}
        <FloatButtonMess handleOnclick={handleOnclick} />

        {collapsed && <Chat setCollapsed={setCollapsed} connection={connection}/>}

        <Outlet />
      </div>

      <Footer />
    </>
  );
}

export default LayoutDefault;
