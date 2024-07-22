import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender } from "../../../config/ChatLogic";
import { ChatState } from "../../../context/ChatProvider";
import Avtar from "../chatAvtar/Avtar";
import { motion } from "framer-motion";
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
                      ? "mt-1 flex flex-wrap"
                      : `flex justify-end mt-1 w-full flex-wrap`
                  }
                >
                  <motion.span
                    className={
                      m.sender._id === user._id
                        ? "bg-white p-2 text-xs text-slate-700  border-white border rounded-md shadow-xl flex flex-wrap"
                        : "bg-slate-900 p-2 text-xs text-white  border-white border rounded-md shadow-xl flex flex-wrap"
                    }
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {m.content}
                  </motion.span>
                </div>
              </div>
            );
          })}
      </ScrollableFeed>
    </div>
  );
};

export default ScrollableChat;
