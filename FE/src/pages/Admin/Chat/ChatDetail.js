import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import "./Chat.css";
import { getCookie } from "../../../helpers/Cookie.helper";
function ChatDetail({ connection }) {
  const [messageAdmin, setMessageAdmin] = useState("Hello friend");
  const [messageUser, setMessageUser] = useState("");
  const tableIdV2 = getCookie("tableId");
  const storeId = getCookie("storeId");

  useEffect(() => {
    const joinChatroom = async () => {
      if (connection.state === signalR.HubConnectionState.Connected) {
        try {
          await connection.invoke(
            "JoinSpecificChatroom",
            {
              UserId: parseInt(tableIdV2),
              Role: 0,
              UserName: `table: ${tableIdV2}`,
            },
            `store ${storeId}`
          );
          console.log("JoinChat invoked successfully.");
        } catch (error) {
          console.error("Error invoking JoinChat:", error);
        }
      }
    };

    // Đăng ký sự kiện JoinSpecificChatroom
    const handleJoinSpecificChatroom = (userChat, Store) => {
      try {
        setMessageUser(`Hello toi moi vao ${userChat.userName}`);
        console.log(userChat, Store);
      } catch (error) {
        console.error("Error invoking JoinChat:", error);
      }
    };

    // Đăng ký sự kiện receiveMessage
    const receiveMessage = (userChat, ChatRoom, message, conversationExist, newMessage) => {
      setMessageUser(`${message} ${userChat.userName}, xin chao`);
      console.log(userChat, ChatRoom, message, conversationExist, newMessage);
    };

    if (connection.state === signalR.HubConnectionState.Connected) {
      joinChatroom();
      connection.on("JoinSpecificChatroom", handleJoinSpecificChatroom);
      connection.on("ReceiveMessageInput", receiveMessage);
    }

    // Hủy đăng ký sự kiện khi component unmount hoặc kết nối thay đổi
    // return () => {
    //   if(connection.state === signalR.HubConnectionState.Connected) {
    //     connection.off("JoinSpecificChatroom", handleJoinSpecificChatroom);
    //   }
    // };
  }, [connection]);

  return (
    <>
      <main class="msger-chat">
        <div class="msg left-msg">
          <div
            class="msg-img"
            style={{
              background: "https://image.flaticon.com/icons/svg/327/327779.svg",
            }}
          ></div>

          <div class="msg-bubble">
            <div class="msg-info">
              <div class="msg-info-name">Admin</div>
              <div class="msg-info-time">12:45</div>
            </div>

            <div class="msg-text">{messageAdmin}</div>
          </div>
        </div>

        <div class="msg right-msg">
          <div
            class="msg-img"
            //   style="background-image: url(https://image.flaticon.com/icons/svg/145/145867.svg)"
          ></div>

          <div class="msg-bubble">
            <div class="msg-info">
              <div class="msg-info-name">Sajad</div>
              <div class="msg-info-time">12:46</div>
            </div>

            <div class="msg-text">{messageUser}</div>
          </div>
        </div>
      </main>
    </>
  );
}

export default React.memo(ChatDetail); //ChatDetail; 
