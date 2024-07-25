import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender } from "../../../config/ChatLogic";
import { ChatState } from "../../../context/ChatProvider";
import { motion } from "framer-motion";
import { isSameSenderMargin } from "../../../config/ChatLogic";
import { isSameUser } from "../../../config/ChatLogic";
const ScrollableChat = ({ messages }) => {
  console.log(messages);
  const { user } = ChatState();
  return (
    <div className="flex overflow-auto flex-col  h-full all_messages_section">
      <div className="flex overflow-auto flex-col  h-full p-1">
        {messages &&
          messages.map((m) => {
            return m.sender._id !== user._id ? (
              <div className="w-full flex mt-1">
                <div
                  className="md:max-w-72 sm:max-w-44 max-w-32 bg-slate-900 text-slate-100 shadow-md p-1 rounded-sm  text-xs   break-words"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  {m.content}
                </div>
              </div>
            ) : (
              <div className=" w-full mt-1 flex flex-row-reverse">
                <motion.div
                  className="md:max-w-72 sm:max-w-44 max-w-32  text-right shadow-md p-1 text-xs rounded-sm break-words"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  {m.content}
                </motion.div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ScrollableChat;
