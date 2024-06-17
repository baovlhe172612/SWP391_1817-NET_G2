import React, { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import "./Chat.css";
import { useDispatch, useSelector } from "react-redux";
import {
  OnJoinSpecificChatRoom,
  OnReciveMessage,
  joinSpecificChatroom,
} from "../../../helpers/Chat.helper";
import { GET_MESSAGE } from "../../../helpers/APILinks";
import { get } from "../../../helpers/API.helper";
import { messageAdminActions } from "../../../actions/messageAdmin.actions";
function ChatDetail({ connection, conversation, listMessage }) {
  const account = useSelector((state) => state.AccountReducer);
  const storeId = account.storeId;
  const lastMessageRef = useRef(null);
  const dispatch = useDispatch();

  // tự động focus vào phần tử message mới nhất
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [listMessage]);

  // lắng nghe các sự kiện
  useEffect(() => {
    if (connection.state === signalR.HubConnectionState.Connected) {
      // join vào phòng đặc biết
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

      // không hiểu sao gọi hàm call back lại lỗi :))
      const receiveMessage = async (
        userChat,
        ChatRoom,
        message,
        conversationExist,
        newMessage
      ) => {
        if (conversationExist) {
          try {
            const data = await get(
              `${GET_MESSAGE}/${conversationExist.conversationId}`
            );
            dispatch(messageAdminActions(data));
            console.log(`nhận tin nhắn oke ${userChat.userId}`);
          } catch (error) {
            console.log(error);
          }
        }
      };

      // lắng nghe server trả về các sự kiện
      connection.on("JoinSpecificChatroom", OnJoinSpecificChatRoom);
      connection.on("ReceiveMessageInput", receiveMessage);
    }
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
                  message.role === 1 ? "msg right-msg" : "msg left-msg"
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
                    <div className="msg-info-time">{message.timeStamp}</div>
                  </div>

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
