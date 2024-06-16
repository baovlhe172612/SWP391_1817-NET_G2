import React, { useEffect, useState } from "react";
import "./Chat.css";
import { CloseOutlined } from "@ant-design/icons";
import ChatDetail from "./ChatDetail";
import * as signalR from "@microsoft/signalr";
import { getCookie } from "../../../helpers/Cookie.helper";

function Chat({ setCollapsed, connection }) {
  const [message, setMessage] = useState("");
  const tableIdV2 = getCookie("tableId");
  const storeId = getCookie("storeId");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(`store ${storeId}`)

    if (connection.state === signalR.HubConnectionState.Connected) {
      await connection.invoke(
        "SendMessage",
        {
          UserId: parseInt(tableIdV2),
          Role: 0,
          UserName: `table: ${tableIdV2}`,
        },

        message,
        
        `store ${storeId}`,

        {
          userChatFirstId: parseInt(tableIdV2) * 100, // userID
          userSecondId: parseInt(storeId) // admin
        }, 

        parseInt(tableIdV2) * 100

      );
    }
  };

  return (
    <>
      <section class="msger">
        <header class="msger-header">
          <div class="msger-header-title">
            <i class="fas fa-comment-alt"></i> SimpleChat
          </div>
          <div class="msger-header-options">
            <span>
              <CloseOutlined onClick={() => setCollapsed(false)} />
            </span>
          </div>
        </header>

        {/* Chat Detail */}
        <ChatDetail connection={connection} />
        {/* Chat Detail */}

        <form class="msger-inputarea">
          <input
            type="text"
            class="msger-input"
            placeholder="Enter your message..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button class="msger-send-btn" onClick={handleSubmit}>
            Send
          </button>
        </form>
      </section>
    </>
  );
}

export default Chat;
