import * as signalR from "@microsoft/signalr";
import { useDispatch } from "react-redux";
import { GET_MESSAGE } from "./APILinks";
import { get } from "./API.helper";
import { messageAdminActions } from "../actions/messageAdmin.actions";

// join joinSpecificChatroom
export const joinSpecificChatroom = async (
  connection,
  userChat,
  ChatRoom,
  UserChatFirstId,
  UserSecondId
) => {
  if (connection.state === signalR.HubConnectionState.Connected) {
    try {
      await connection.invoke(
        "JoinSpecificChatroom",

        userChat,

        ChatRoom,

        UserChatFirstId,

        UserSecondId
      );
      console.log(`JoinChat invoked successfully. ${ChatRoom}`);
    } catch (error) {
      console.error("Error invoking JoinChat:", error);
    }
  }
};

// invoke sendMessage
export const sendMessage = async (
  connection,
  userChat,
  message,
  chatRoom,
  conversation,
  sensiderId
) => {
  if (connection.state === signalR.HubConnectionState.Connected) {
    await connection.invoke(
      "SendMessage",
      userChat,

      message,

      chatRoom,

      conversation,

      sensiderId
    );
  } else {
    console.log("Connection is not in a connected state."); // Logging the connection state
  }
};

//
export const sendMessageGroup = async (connection, ChatRoom, message, conversation) => {
  await connection.invoke("SendMessageGroup", ChatRoom, message, conversation);
};

// -----------------------------------------------------------------------

// Đăng ký sự kiện JoinSpecificChatroom
export const OnJoinSpecificChatRoom = () => {
  const dispatch = useDispatch();

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

          dispatch(messageAdminActions(data));
          console.log(
            ` Invoking JoinChat success: ${conversationExist.conversationId}`
          );
        } catch (error) {
          console.log(error);
        }
      }
      console.error(" Invoking JoinChat success:");
    } catch (error) {
      console.error("Error invoking JoinChat:", error);
    }
  };

  return handleJoinSpecificChatroom;
};

// Đăng ký sự kiện receiveMessage
export const OnReciveMessage = (setLoad, load) => {
  const dispatch = useDispatch();

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

        setLoad(!load);

        dispatch(messageAdminActions(data));
        console.log(`nhận tin nhắn oke ${userChat.userId}`);
      } catch (error) {
        console.log(error);
      }
    }
    // console.log(userChat, ChatRoom, message, conversationExist, newMessage);
  };

  return receiveMessage;
};
