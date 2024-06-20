import React, { useEffect, useState } from "react";
import ChatDetail from "./ChatDetail";
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import * as signalR from "@microsoft/signalr";
import { GET_MESSAGE } from "../../../helpers/APILinks";
import { get } from "../../../helpers/API.helper";
import {
  OnJoinSpecificChatRoom,
  joinSpecificChatroom,
  sendMessage,
} from "../../../helpers/Chat.helper";

function Chat({ conversation }) {
  const [message, setMessage] = useState("");
  const [listMessage, setListMessage] = useState([]);
  const connection = useSelector((state) => state.ConnectionReducer);
  const account = useSelector((state) => state.AccountReducer);
  const dispatch = useDispatch();
  const storeId = account.storeId;

  // call API
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await get(`${GET_MESSAGE}/${conversation.conversationId}`);
        setListMessage(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, [conversation]);

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
            console.log(data);
            setListMessage(data);
            console.log(`nhận tin nhắn oke ${ChatRoom} ${userChat.userId}`);
          } catch (error) {
            console.log(error);
          }
        }
      };

      const leaveChatroom = async () => {
        await connection.invoke(
          "LeaveStore",
          `store ${storeId} - ${conversation.userChatFirstId}`
        );
      };

      // lắng nghe server trả về các sự kiện
      connection.on("JoinSpecificChatroom", OnJoinSpecificChatRoom);
      connection.on("ReceiveMessageInput", receiveMessage);

      // thoát khỏi phòng
      return () => {
        if (connection.state === signalR.HubConnectionState.Connected) {
          // leaveChatroom();
          connection.off("JoinSpecificChatroom", OnJoinSpecificChatRoom);
          connection.off("ReceiveMessageInput", receiveMessage);

          leaveChatroom();

          console.log(
            `bye bye store ${storeId} - ${conversation.userChatFirstId}`
          );
        }
      };
    }
  }, [conversation]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // lấy storeId
    const storeId = account.storeId;

    // gửi lên server sự kiện sendMessage
    sendMessage(
      connection,
      {
        UserId: parseInt(storeId),
        Role: 1,
        UserName: `store: ${storeId}`,
      },

      message,

      `store ${storeId} - ${conversation.userChatFirstId}`,

      {
        userChatFirstId: conversation.userChatFirstId, // userID
        userSecondId: parseInt(storeId), // admin
      },

      storeId
    );

    // lấy lại data mới khi gửi lên
    // try {
    //   const data = await get(`${GET_MESSAGE}/${conversation.conversationId}`);
    //   console.log(data);
    //   setListMessage([
    //     ...data,
    //     { ...data[data.length - 1], contentChat: message },
    //   ]);
    // } catch (error) {
    //   console.log(error);
    // }

    setMessage(" ");
  };

  return (
    <>
      <section class="msger2">
        <header class="msger-header">
          <div class="msger-header-title">
            <i class="fas fa-comment-alt"></i> SimpleChat
          </div>
          <div class="msger-header-options">
            <span>
              <CloseOutlined />
            </span>
          </div>
        </header>

        {/* Chat Detail */}
        {connection && conversation && (
          <ChatDetail conversation={conversation} listMessage={listMessage} />
        )}
        {/* Chat Detail */}

        <form class="msger-inputarea">
          <input
            type="text"
            class="msger-input"
            placeholder="Enter your message..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button
            class="msger-send-btn"
            onClick={handleSubmit}
            conversation={conversation}
          >
            Send
          </button>
        </form>
      </section>
    </>
  );
}

export default Chat;
