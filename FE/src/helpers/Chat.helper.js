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
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.error("Error invoking JoinChat:", error);
    }
  };

  return handleJoinSpecificChatroom;
};

// Đăng ký sự kiện receiveMessage
export const OnReciveMessage = () => {
  const receiveMessage = (
    userChat,
    ChatRoom,
    message,
    conversationExist,
    newMessage
  ) => {
    console.log(userChat, ChatRoom, message, conversationExist, newMessage);
  };

  return receiveMessage;
};
