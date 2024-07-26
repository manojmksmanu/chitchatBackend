import React, { useState, useEffect } from "react";
import { ChatState } from "../../context/ChatProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { getSender } from "../../config/ChatLogic";
import ScrollableFeed from "react-scrollable-feed";
import { motion, AnimatePresence } from "framer-motion";
import { CiMenuBurger } from "react-icons/ci";
import { IoNotificationsCircleOutline } from "react-icons/io5";

const MyChats = ({ isOpen, setIsOpen }) => {
  const [loggedUser, setLoggedUser] = useState(null); // Set initial state to null
  const { user, setChats, chats, setSelectedChat, selectedChat } = ChatState();

  const fetchChats = async () => {
    if (!user) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        "http://localhost:5000/api/chat/chats",
        config
      );
      setChats(data);
    } catch (error) {
      toast.error("Failed to Load the chats");
    }
  };

  useEffect(() => {
    fetchChats();
  }, [user]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    setLoggedUser(storedUser);
  }, [user]);

  if (!loggedUser || !chats) {
    return <div>Loading...</div>; // Display loading message or spinner
  }

  return (
    <div className="h-full flex flex-col all_chats_section relative">
      <div className="md:hidden w-full h-10 bg-slate-900 text-white flex justify-between items-center p-2">
        <div className="font-extrabold flex gap-2">
          CC
          <div className="flex gap-1 justify-center items-center">
            <div className="h-1 w-1 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-1 w-1 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-1 w-1 bg-white rounded-full animate-bounce"></div>
          </div>
        </div>
        <div className="flex gap-3">
          <IoNotificationsCircleOutline className="cursor-pointer" />
          <CiMenuBurger
            className="cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
        </div>
      </div>
      <div className="flex-grow overflow-auto">
        {chats.length > 0 ? (
          <ScrollableFeed className="pl-3 pr-3">
            <AnimatePresence>
              {chats.map((chat) => {
                const sender = getSender(loggedUser, chat.users);
                const chatPic = !chat.isGroupChat ? sender?.pic : chat.groupPic;

                return (
                  <motion.div
                    key={chat._id}
                    onClick={() => setSelectedChat(chat)}
                    className={
                      selectedChat && selectedChat._id === chat._id
                        ? "bg-slate-950 p-3 text-white rounded-md mt-2 cursor-pointer shadow-xl"
                        : "p-3 bg-slate-50 rounded-md mt-2 cursor-pointer shadow-xl "
                    }
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    layout
                    transition={{ duration: 0.2 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <img
                        className="md:w-10 sm:w-10 sm:h-10 md:h-10 w-10 h-10 rounded-full shadow-md"
                        src={chatPic || ""}
                        alt="chat-pic"
                      />
                      <div className="flex flex-col">
                        <b>
                          {!chat.isGroupChat ? sender?.name : chat.chatName}
                        </b>
                        {chat.latestMessage && (
                          <div className="text-xs flex flex-wrap text-wrap">
                            {chat.latestMessage.sender.name === user.name
                              ? "You"
                              : chat.latestMessage.sender.name}{" "}
                            :{" "}
                            {chat.latestMessage.content.length > 20
                              ? chat.latestMessage.content.substring(0, 15) +
                                "..."
                              : chat.latestMessage.content}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </ScrollableFeed>
        ) : (
          <div>No chats available</div>
        )}
      </div>
    </div>
  );
};

export default MyChats;
