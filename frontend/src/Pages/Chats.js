import React, { useState } from "react";
import { ChatState } from "../context/ChatProvider";
import MyChats from "../component/misc/MyChats";
import ChatBox from "../component/misc/ChatBox";
import SideNavBar from "../component/misc/SideNavBar";
import { motion } from "framer-motion";
const Chats = () => {
  const { user, chats, selectedChat } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  const [isOpen, setIsOpen] = useState();
  return (
    <>
      <motion.div
        className="h-screen bg-neutral-950 overflow-hidden"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
      >
        <SideNavBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="flex gap-2 md:ml-12 bg-white h-screen m-2 rounded-2xl">
          <div
            className={`flex-shrink-0 w-full md:max-w-xs h-full md:block ${
              selectedChat ? "hidden md:block" : "block"
            } bg-slate-950 rounded-l-xl`}
          >
            {user && <MyChats fetchAgain={fetchAgain} setIsOpen={setIsOpen} />}
          </div>
          <motion.div
            className={`flex-1 h-full ${
              selectedChat ? "block" : "hidden md:block"
            }`}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            {user && (
              <ChatBox
                fetchAgain={fetchAgain}
                setFetchAgain={setFetchAgain}
                setIsOpen={setIsOpen}
              />
            )}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Chats;
