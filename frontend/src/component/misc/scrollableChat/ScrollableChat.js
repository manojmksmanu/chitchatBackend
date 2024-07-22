import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender } from "../../../config/ChatLogic";
import { ChatState } from "../../../context/ChatProvider";
import Avtar from "../chatAvtar/Avtar";
const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  return (
    <div className="flex flex-col h-full all_messages_section ">
      <ScrollableFeed className="p-3">
        {messages &&
          messages.map((m, i) => {
            return (
              <div className="flex" key={i}>
                {isSameSender(messages, m, i, user._id) ||
                  (isLastMessage(messages, i, user._id) && (
                    <>
                      {
                        //  <img src={m.sender.pic} />
                      }
                    </>
                  ))}
                <div
                  className={
                    m.sender._id !== user._id
                      ? "mt-1"
                      : `flex justify-end mt-1 w-full`
                  }
                >
                  <span
                    style={{
                      backgroundColor: `${
                        m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                      }`,
                      borderRadius: "20px",
                      padding: "5px 15px",
                      maxWidth: "100%",
                    }}
                  >
                    {m.content}
                  </span>
                </div>
              </div>
            );
          })}
      </ScrollableFeed>
    </div>
  );
};

export default ScrollableChat;
