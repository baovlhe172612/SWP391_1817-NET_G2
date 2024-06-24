import React, { useEffect, useState } from "react";
import "./Chat.css";
import { CloseOutlined } from "@ant-design/icons";
import ChatDetail from "./ChatDetail";
import * as signalR from "@microsoft/signalr";
import { getCookie } from "../../../helpers/Cookie.helper";
import { Badge } from "antd";

function Chat({ setCollapsed, connection, setCollapsedNotify }) {
  const [message, setMessage] = useState("");
  const tableIdV2 = getCookie("tableId");
  const storeId = getCookie("storeId");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (connection.state === signalR.HubConnectionState.Connected) {
      console.log(`store ${storeId} - ${parseInt(tableIdV2) * 10000}`);
      await connection.invoke(
        "SendMessage",
        {
          UserId: parseInt(tableIdV2) * 10000,
          Role: 0,
          UserName: `table: ${tableIdV2}`,
        },

        message,

        `store ${storeId} - ${parseInt(tableIdV2) * 10000}`,

        {
          userChatFirstId: parseInt(tableIdV2) * 10000, // userID
          userSecondId: parseInt(storeId), // admin
        },

        parseInt(tableIdV2) * 10000
      );

      await connection.invoke("SendMessageGroup", `store ${storeId}`, message, {
        userChatFirstId: parseInt(tableIdV2) * 10000, // userID
        userSecondId: parseInt(storeId), // admin
      });

      setMessage("");
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
          <ChatDetail connection={connection} setCollapsedNotify={setCollapsedNotify}/>
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
