import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
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
                      "url('https://image.flaticon.com/icons/svg/327/327779.svg')",
                  }}
                ></div>

                <div className="msg-bubble">
                  <div className="msg-info">
                    <div className="msg-info-name">{message.userName}</div>
                    <div className="msg-info-time">{message.timeStamp}</div>
                  </div>

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
