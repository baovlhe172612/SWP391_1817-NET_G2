import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import { getRelativeTime } from "../../../helpers/Time.helper";
function ChatDetail({ conversation, listMessage }) {
  const lastMessageRef = useRef(null);

  // tự động focus vào phần tử message mới nhất
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [listMessage]);

  return (
    <>
      <main className="msger-chat">
        {listMessage.length > 0 &&
          listMessage.map((message, index) => {
            const isLastMessage = index == listMessage.length - 1;
            return (
              <div
                className={
                  message.role === 1 ? "msg right-msg" : "msg left-msg"
                }
                key={index}
                ref={isLastMessage ? lastMessageRef : null}
              >
                <div
                  className="msg-img"
                  style={{
                    backgroundImage:
                      message.role === 1
                        ? "url('https://w7.pngwing.com/pngs/306/70/png-transparent-computer-icons-management-admin-silhouette-black-and-white-neck-thumbnail.png')"
                        : "url('https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=')",
                  }}
                ></div>
 
 
                <div className="msg-bubble">
                  <div className="msg-info">
                    <div className="msg-info-name">{message.userName}</div>
                  </div>
                  {/*  */}
                  {/* <div className="msg-info-time">
                    {getRelativeTime(message.timeStamp)}
                  </div> */}
 
 
                  <div className="msg-text">{message.contentChat}</div>
                </div>
              </div>
            );
          })}
      </main>
    </>
  );
 }
 
 
 export default React.memo(ChatDetail); //ChatDetail;