import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { useSelector } from "react-redux";

import Chat from "./Chat";
import "./ListChat.css";

function ListChat() {
  const [conversations, setConversations] = useState([]);
  const [conversation, setConversation] = useState(null);
  const connection = useSelector((state) => state.ConnectionReducer);
  const account = useSelector((state) => state.AccountReducer);
  let listMessage = useSelector((state) => state.MessageReducer);

  useEffect(() => {
    const storeId = account.storeId;
    // gửi lên server sự thay đổi
    const getAllConver = async () => {
      if (connection.state === signalR.HubConnectionState.Connected) {
        try {
          await connection.invoke("GetAllConver", storeId, `store ${storeId}`);
          console.log("GetAllConver invoked successfully.");
        } catch (error) {
          console.error("Error invoking GetAllConver:", error);
        }
      }
    };

    // lắng nghe sự kiện trả về
    const listConversation = (listConversation, chatRoom) => {
      setConversation(listConversation[0]);
      setConversations(listConversation);
      console.log(listConversation, chatRoom);
    };

    if (connection.state === signalR.HubConnectionState.Connected) {
      getAllConver();
      connection.on("listConversation", listConversation);
    }
  }, [connection]);

  const handleClick = (item) => {
    setConversation(item);
  };

  return (
    <>
      <div className="chat">
        {/*  */}
        <div class="wrapper">
          <section class="users">
            <header>
              <div class="content">
                <img
                  src="https://png.pngtree.com/png-vector/20220520/ourlarge/pngtree-worker-admin-avatar-black-business-png-image_4627365.png"
                  alt="User Image"
                />
                <div class="details">
                  <span></span>
                  <p></p>
                </div>
              </div>
            </header>

            <div class="users-list">
              {/*  */}
              {conversations.length > 0 &&
                conversations.map((item) => (
                  <div
                    className="content"
                    key={item.conversationId}
                    onClick={() => handleClick(item)}
                  >
                    <img />
                    <div className="details">
                      <span>table {item.userChatFirstId / 10000}</span>
                      {/* <div>Khoe khong</div> */}
                    </div>
                  </div>
                ))}
              {/*  */}
            </div>
          </section>
        </div>
        {/*  */}

        {conversation && <Chat conversation={conversation} listMessage={listMessage}/>}
      </div>
    </>
  );
}

export default ListChat;
