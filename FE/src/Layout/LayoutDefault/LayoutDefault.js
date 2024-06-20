import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import FloatButtonMess from "./FloatBtn/FloatButtonMess";
import { useEffect, useState } from "react";
import Chat from "./Chat/Chat";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { getCookie } from "../../helpers/Cookie.helper";
import { CHAT_API } from "../../helpers/APILinks";
import * as signalR from "@microsoft/signalr";
import { joinSpecificChatroom } from "../../helpers/Chat.helper";
import NotifyChat from "./NotifyChat/NotifyChat";

function LayoutDefault() {
  const [collapsed, setCollapsed] = useState(false);
  const [connection, setConnection] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const tableId = searchParams.get("tableId");

  const tableIdV2 = getCookie("tableId");
  const storeId = getCookie("storeId");

  // kết nối với server
  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${CHAT_API}`)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  // lắng nghe sự thay đổi trong server khi connect
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

  // lắng nghe các sự kiện
  useEffect(() => {
    if (connection) {
      //
      const handleJoinSpecificChatroom = async (
        userChat,
        Store,
        conversationExist
      ) => {
        try {
          console.log(userChat, Store, conversationExist);
        } catch (error) {
          console.error("Error invoking JoinChat:", error);
        }
      };

      const receiveMessage = async (
        userChat,
        ChatRoom,
        message,
        conversationExist,
        newMessage
      ) => {
        console.log(ChatRoom);
      };

      const joinChatroom = async () => {
        try {
          await connection.start();
          joinSpecificChatroom(
            connection,
            {
              UserId: parseInt(tableIdV2) * 10000,
              Role: 0,
              UserName: `table: ${tableIdV2}`,
            },
            `store ${storeId} - ${parseInt(tableIdV2) * 10000}`,
            parseInt(tableIdV2) * 10000,
            parseInt(storeId)
          );

          connection.on("JoinSpecificChatroom", handleJoinSpecificChatroom);
          connection.on("ReceiveMessageInput", receiveMessage);
        } catch (error) {
          console.error("Error starting connection:", error);
        }
      };

      if (connection.state === signalR.HubConnectionState.Connected) {
        joinChatroom();
      } else {
        connection
          .start()
          .then(() => {
            joinChatroom();
          })
          .catch((error) => {
            console.error("Error reconnecting:", error);
          });
      }

      // Hủy đăng ký sự kiện khi component unmount hoặc kết nối thay đổi
      return () => {
        connection.off("JoinSpecificChatroom", handleJoinSpecificChatroom);
        connection.off("ReceiveMessageInput", receiveMessage);
      };
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

        {collapsed == false && <NotifyChat connection={connection}/>}
        {collapsed && (
          <Chat setCollapsed={setCollapsed} connection={connection} />
        )}

        <Outlet />
      </div>

      <Footer />
    </>
  );
}

export default LayoutDefault;
