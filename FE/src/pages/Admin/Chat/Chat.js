import React, { useEffect, useState } from "react";
import ChatDetail from "./ChatDetail";
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import * as signalR from "@microsoft/signalr";
import { GET_MESSAGE } from "../../../helpers/APILinks";
import { get } from "../../../helpers/API.helper";
import { messageActions } from "../../../actions/message.actions";
import { messageAdminActions } from "../../../actions/messageAdmin.actions";

function Chat({ conversation }) {
  const connection = useSelector((state) => state.ConnectionReducer);
  const [message, setMessage] = useState("");
  const account = useSelector((state) => state.AccountReducer);
  const dispatch = useDispatch();
  const listMessage = useSelector((state) => state.MessageReducer);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await get(`${GET_MESSAGE}/${conversation.conversationId}`);
        dispatch(messageAdminActions(data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, [conversation]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storeId = account.storeId;

    if (connection.state === signalR.HubConnectionState.Connected) {
      await connection.invoke(
        "SendMessage",
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
    }

    try {
      const data = await get(`${GET_MESSAGE}/${conversation.conversationId}`);
      dispatch(messageAdminActions(data));
    } catch (error) {
      console.log(error);
    }

    setMessage("");
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
          <ChatDetail
            connection={connection}
            conversation={conversation}
            listMessage={listMessage}
          />
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