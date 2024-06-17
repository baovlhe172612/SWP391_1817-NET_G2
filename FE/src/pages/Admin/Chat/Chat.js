import React, { useState } from "react";
import ChatDetail from "./ChatDetail";
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux'
import * as signalR from "@microsoft/signalr";

function Chat({ conversation }) {
    const connection = useSelector(state => state.ConnectionReducer)
    const [message, setMessage] = useState("Hello");
    const account = useSelector(state => state.AccountReducer)
    const dispatch = useDispatch();
    const listMessage = useSelector((state) => state.MessageReducer);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const storeId = account.storeId
    
        console.log({
          UserId: parseInt(storeId),
          Role: 1,
          UserName: `store ${storeId}`,
        },

        message,
        
        `store ${storeId}`,

        {
          userChatFirstId: conversation.userChatFirstId, // userID
          userSecondId: parseInt(storeId) // admin
        }, 

        storeId
      
      )
    
        if (connection.state === signalR.HubConnectionState.Connected) {
          await connection.invoke(
            "SendMessage",
            {
              UserId: parseInt(storeId),
              Role: 1,
              UserName: `store: ${storeId}`,
            },
    
            message,
            
            `store ${storeId}`,
    
            {
              userChatFirstId: conversation.userChatFirstId, // userID
              userSecondId: parseInt(storeId) // admin
            }, 
    
            storeId
    
          );
        }
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
              <CloseOutlined/>
            </span>
          </div>
        </header>

        {/* Chat Detail */}
        {connection && <ChatDetail connection={connection} />}
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
