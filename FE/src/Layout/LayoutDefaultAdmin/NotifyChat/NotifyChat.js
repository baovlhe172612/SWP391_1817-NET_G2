import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as signalR from "@microsoft/signalr";
import { Alert } from "antd";
import "./NotifyChat.css"; // Đảm bảo rằng bạn đã nhập tệp CSS
import { Link } from "react-router-dom";

function NotifyChat() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertKey, setAlertKey] = useState(0);
  const [alertMessage, setAlertMessage] = useState({
    header: "Hello",
    title: "Have a good day",
  });
  const [conversationId, setConversationId] = useState(null);
  const connection = useSelector((state) => state.ConnectionReducer);
  const account = useSelector((state) => state.AccountReducer);

  useEffect(() => {
    if (connection) {
      // join store
      const joinStore = async () => {
        if (connection.state === signalR.HubConnectionState.Connected) {
          try {
            await connection.invoke("JoinStore", `store ${account.storeId}`);
            setShowAlert(true);
            setAlertKey((prevKey) => prevKey + 1);

            setTimeout(() => {
              setShowAlert(false);
            }, 5500); // 0.5s for slideInRight + 5s delay + 0.5s for fadeOut
            console.log("JoinStore invoked successfully.");
          } catch (error) {
            console.error("Error invoking JoinStore:", error);
          }
        }
      };

      // receive mess notify
      const receiveMessageInputForStore = (ChatRoom, message, conversation) => {
        setShowAlert(true);
        setAlertKey((prevKey) => prevKey + 1);

        setAlertMessage({
          header: `New message at table ${conversation.userChatFirstId / 10000}`,
          title: `${message}`,
        });

        setConversationId(conversation.conversationId)

        setTimeout(() => {
          setShowAlert(false);
        }, 5500); // 0.5s for slideInRight + 5s delay + 0.5s for fadeOut
        // console.log(ChatRoom, message, conversation);
      };

      // reset connection if connected = fase
      const startConnection = async () => {
        try {
          if (connection.state === signalR.HubConnectionState.Disconnected) {
            await connection.start();
          }
          joinStore();
          connection.on(
            "ReceiveMessageInputForStore",
            receiveMessageInputForStore
          );
        } catch (error) {
          console.error("Connection failed: ", error);
        }
      };

      if (connection.state !== signalR.HubConnectionState.Connected) {
        startConnection();
      } else {
        joinStore();
        connection.on(
          "ReceiveMessageInputForStore",
          receiveMessageInputForStore
        );
      }
    }
  }, [connection]);

  return (
    <>
      {showAlert && (
        <Link to={`/admin/chat`} >
          <div className={`alert-container`} key={alertKey}>
            <Alert
              message={alertMessage.header}
              description={alertMessage.title}
              type="success"
              showIcon
            />

            <div className="progress-bar">
              <div className="progress-bar-inner"></div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
}

export default NotifyChat;
