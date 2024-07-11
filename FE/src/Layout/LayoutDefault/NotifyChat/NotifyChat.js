import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as signalR from "@microsoft/signalr";
import { Alert } from "antd";
import "./NotifyChat.css"; // Đảm bảo rằng bạn đã nhập tệp CSS
import { Link } from "react-router-dom";
import { joinSpecificChatroom } from "../../../helpers/Chat.helper";
import { getCookie } from "../../../helpers/Cookie.helper";
import soundmessege from "../../../assets/sound/sound.mp3";

function NotifyChat({ connection, setCollapsedNotify, collapsedNotify }) {
  const [showAlert, setShowAlert] = useState(false);
  const [alertKey, setAlertKey] = useState(0);
  const [alertMessage, setAlertMessage] = useState({
    header: "Welcome ",
    title: "Have a good day",
  });
  const tableIdV2 = getCookie("tableId");
  const storeId = getCookie("storeId");
  const sound = new Audio(soundmessege);
  sound.play();


  useEffect(() => {
    if(collapsedNotify) {
      setAlertMessage({
        header: "New Message  ",
      title: "New Message",
      })
    }

    if (connection) {
      // join store
      const joinStore = async () => {
        if (connection.state === signalR.HubConnectionState.Connected) {
          try {
            joinSpecificChatroom(
              connection,
              {
                UserId: parseInt(tableIdV2) * 10000,
                Role: 0,
                UserName: `table: ${tableIdV2}`,
              },
              `store ${storeId} - ${parseInt(tableIdV2) * 10000}`,
              parseInt(tableIdV2) * 10000,
              parseInt(storeId)
            );
            setShowAlert(true);
            setCollapsedNotify(true);
            setAlertKey((prevKey) => prevKey + 1);

            setTimeout(() => {
              setShowAlert(false);
              setCollapsedNotify(false)
            }, 1500); // 0.5s for slideInRight + 5s delay + 0.5s for fadeOut
            console.log("JoinStore invoked successfully.");
          } catch (error) {
            console.error("Error invoking JoinStore:", error);
          }
        }
      };

      // receive mess notify
      const receiveMessage = (
        userChat,
        ChatRoom,
        message,
        conversationExist,
        newMessage
      ) => {
        setShowAlert(true);
        setCollapsedNotify(true);
        setAlertKey((prevKey) => prevKey + 1);

        setAlertMessage({
          header: `New message at store ${conversationExist.userSecondId}`,
          title: `${message}`,
        });

        setTimeout(() => {
          setShowAlert(false);
          setCollapsedNotify(false)

        }, 1500); // 0.5s for slideInRight + 5s delay + 0.5s for fadeOut
        console.log(conversationExist);
      };

      // reset connection if connected = fase
      const startConnection = async () => {
        try {
          if (connection.state === signalR.HubConnectionState.Disconnected) {
            await connection.start();
          }
          joinStore();
          connection.on("ReceiveMessageInput", receiveMessage);
        } catch (error) {
          console.error("Connection failed: ", error);
        }
      };

      if (connection.state !== signalR.HubConnectionState.Connected) {
        startConnection();
      } else {
        joinStore();
        connection.on("ReceiveMessageInput", receiveMessage);
      }
    }
  }, [connection]);

  return (
    <>
      {showAlert && (
        <div className={`alert-containerV2`} key={alertKey}>
          <Alert
            message={alertMessage.header}
            description={alertMessage.title}
            type="success"
            showIcon
          />

          {/* <div className="progress-bar">
            <div className="progress-bar-inner"></div>
          </div> */}
        </div>
      )}
    </>
  );
}

export default NotifyChat;
