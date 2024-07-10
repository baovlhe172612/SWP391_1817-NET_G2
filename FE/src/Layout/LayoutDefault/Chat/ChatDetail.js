import React, { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import "./Chat.css";
import { getCookie } from "../../../helpers/Cookie.helper";
import { get } from "../../../helpers/API.helper";
import { GET_MESSAGE } from "../../../helpers/APILinks";
import { useDispatch, useSelector } from "react-redux";
import { messageActions } from "../../../actions/message.actions";
import {
  joinSpecificChatroom,
  joinSpecificChatroomV2,
} from "../../../helpers/Chat.helper";
import { getRelativeTime } from "../../../helpers/Time.helper";

function ChatDetail({ connection, setCollapsedNotify }) {
  const tableIdV2 = getCookie("tableId");
  const storeId = getCookie("storeId");
  const listMessage = useSelector((state) => state.MessageReducer);
  const dispatch = useDispatch();

  //conversationExist.conversationId
  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [listMessage]);

  useEffect(() => {
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
          setCollapsedNotify(true)
          console.log(`nhận tin nhắn oke ${userChat.userId}`);
        } catch (error) {
          console.log(error);
        }
      }
      // console.log(userChat, ChatRoom, message, conversationExist, newMessage);
    };

    // lắng nghe những sự kiệu nếu connect tồn tại
    if (connection.state === signalR.HubConnectionState.Connected) {
      // joinChatroom();
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

      //
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
      <main className="msger-chat">
        {listMessage.length > 0 &&
          listMessage.map((message, index) => {
            const isLastMessage = index == listMessage.length - 1;
            return (
              <div
                className={
                  message.role === 1 ? "msg left-msg" : "msg right-msg"
                }
                key={index}
                ref={isLastMessage ? lastMessageRef : null}
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
                  </div>
                  <div className="msg-info-time">{getRelativeTime(message.timeStamp)}</div>

                  <div className="msg-text">{message.contentChat}</div>
                </div>
              </div>
            );
          })}
      </main>
    </>
  );
}

export default React.memo(ChatDetail); //ChatDetail;
