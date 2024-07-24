import React, { useState, useEffect } from "react";
import { ChatState } from "../../context/ChatProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { getSender } from "../../config/ChatLogic";
import ScrollableFeed from "react-scrollable-feed";
import { motion, AnimatePresence } from "framer-motion";

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
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
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    setLoggedUser(storedUser);
    fetchChats();
  }, [user, selectedChat]);

  return (
    <div className="h-full flex flex-col all_chats_section">
      <div className="flex-grow overflow-auto">
        {chats ? (
          <ScrollableFeed className="pl-3 pr-3">
            <AnimatePresence>
              {chats.map((chat) => (
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
                    {!chat.isGroupChat ? (
                      <img
                        className="md:w-10 md:h-10 rounded-full shadow-md"
                        src={
                          getSender(loggedUser, chat.users).pic
                            ? getSender(loggedUser, chat.users).pic
                            : ""
                        }
                        alt="chat-pic"
                      />
                    ) : (
                      <img
                        className="md:w-10 md:h-10 rounded-full shadow-md"
                        src={chat.groupPic ? chat.groupPic : ""}
                        alt="chat-pic"
                      />
                    )}
                    <div className="flex flex-col">
                      <b>
                        {!chat.isGroupChat
                          ? getSender(loggedUser, chat.users).name
                          : chat.chatName}
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
              ))}
            </AnimatePresence>
          </ScrollableFeed>
        ) : (
          "loading chats"
        )}
      </div>
    </div>
  );
};

export default MyChats;
