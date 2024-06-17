import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import "./Chat.css";
import { getCookie } from "../../../helpers/Cookie.helper";
import { get } from "../../../helpers/API.helper";
import { GET_MESSAGE } from "../../../helpers/APILinks";
import { useDispatch, useSelector } from "react-redux";
import { messageActions } from "../../../actions/message.actions";

function ChatDetail({ connection }) {
  const tableIdV2 = getCookie("tableId");
  const storeId = getCookie("storeId");
  const listMessage = useSelector((state) => state.MessageReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const joinChatroom = async () => {
      if (connection.state === signalR.HubConnectionState.Connected) {
        try {
          await connection.invoke(
            "JoinSpecificChatroom",
            {
              UserId: parseInt(tableIdV2) * 10000,
              Role: 0,
              UserName: `table: ${tableIdV2}`,
            },

            `store ${storeId}`,

            parseInt(tableIdV2) * 10000,
            parseInt(storeId)
          );
          console.log("JoinChat invoked successfully.");
        } catch (error) {
          console.error("Error invoking JoinChat:", error);
        }
      }
    };

    // Đăng ký sự kiện JoinSpecificChatroom
    const handleJoinSpecificChatroom = async (
      userChat,
      Store,
      conversationExist
    ) => {
      try {
        // nhận list message từ API
        if (conversationExist) {
          try {
            const data = await get(
              `${GET_MESSAGE}/${conversationExist.conversationId}`
            );
            // setMessage(data);
            dispatch(messageActions(data));
          } catch (error) {
            console.log(error);
          }
        }

        // console.log(userChat, Store, conversationExist);
      } catch (error) {
        console.error("Error invoking JoinChat:", error);
      }
    };

    // Đăng ký sự kiện receiveMessage
    const receiveMessage = async (
      userChat,
      ChatRoom,
      message,
      conversationExist,
      newMessage
    ) => {
      // nhận list message từ API
      if (conversationExist) {
        try {
          const data = await get(
            `${GET_MESSAGE}/${conversationExist.conversationId}`
          );
          dispatch(messageActions(data));
        } catch (error) {
          console.log(error);
        }
      }
      // console.log(userChat, ChatRoom, message, conversationExist, newMessage);
    };

    // lắng nghe những sự kiệu nếu connect tồn tại
    if (connection.state === signalR.HubConnectionState.Connected) {
      joinChatroom();
      connection.on("JoinSpecificChatroom", handleJoinSpecificChatroom);
      connection.on("ReceiveMessageInput", receiveMessage);
    }

    // Hủy đăng ký sự kiện khi component unmount hoặc kết nối thay đổi
    return () => {
      connection.off("JoinSpecificChatroom", handleJoinSpecificChatroom);
    };
  }, [connection]);

  return (
    <>
      <main class="msger-chat">
        {listMessage.length > 0 &&
          listMessage.map((message, index) => (
            <div
              className={message.role === 1 ? "msg left-msg" : "msg right-msg"}
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
