import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import "./Chat.css";
import { useSelector } from "react-redux";
import { OnJoinSpecificChatRoom, OnReciveMessage, joinSpecificChatroom } from "../../../helpers/Chat.helper";
function ChatDetail({ connection, conversation, listMessage }) {
  const account = useSelector((state) => state.AccountReducer);
  const storeId = account.storeId;

  useEffect(() => {
    if (connection.state === signalR.HubConnectionState.Connected) {
      //
      joinSpecificChatroom(
        connection,
        {
          UserId: parseInt(storeId),
          Role: 1,
          UserName: `store ${storeId}`,
        },
        `store ${storeId} - ${conversation.userChatFirstId}`,

        conversation.userChatFirstId,

        parseInt(storeId)
      );

      // lắng nghe server
      connection.on("JoinSpecificChatroom", OnJoinSpecificChatRoom);
      connection.on("ReceiveMessageInput", OnReciveMessage);
    }

  }, [connection]);

  return (
    <>
      <main class="msger-chat">
        {listMessage.length > 0 &&
          listMessage.map((message, index) => (
            <div
              className={message.role === 1 ? "msg right-msg" : "msg left-msg"}
              key={index}
            >
              <div
                className="msg-img"
                style={{
                  backgroundImage:
                    "url('https://image.flaticon.com/icons/svg/327/327779.svg')",
                }}
              ></div>

              <div className="msg-bubble">
                <div className="msg-info">
                  <div className="msg-info-name">{message.userName}</div>
                  <div className="msg-info-time">{message.timeStamp}</div>
                </div>

                <div className="msg-text">{message.contentChat}</div>
              </div>
            </div>
          ))}
      </main>
    </>
  );
}

export default React.memo(ChatDetail); //ChatDetail;
