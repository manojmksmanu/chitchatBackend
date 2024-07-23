import React, { useState, useEffect } from "react";
import { ChatState } from "../../context/ChatProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { getSender } from "../../config/ChatLogic";
import ScrollableFeed from "react-scrollable-feed";
import { motion } from "framer-motion";

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { user, setChats, chats, setSelectedChat, selectedChat } = ChatState();
  console.log(selectedChat);
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
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    setLoggedUser(storedUser);
    fetchChats();
  }, [user, selectedChat]);

  return (
    <div className="h-full flex flex-col all_chats_section ">
      {/* Uncomment and customize if needed */}
      {/* <div className="relative">
        <input
          placeholder="Search"
          className="w-full bg-blue-200 rounded-xl p-1 placeholder:text-sm pl-5 text-black"
        />
      </div> */}

      <div className="flex-grow overflow-auto">
        {chats ? (
          <ScrollableFeed className="pl-3 pr-3">
            {chats.map((chat) => (
              <motion.div
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                className={
                  selectedChat._id && selectedChat._id === chat._id
                    ? "bg-slate-900 p-3 text-white border-white border rounded-md mt-2 cursor-pointer shadow-xl"
                    : "p-3 bg-slate-50 rounded-xl mt-2 cursor-pointer"
                }
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex flex-wrap items-center gap-2">
                  {!chat.isGroupChat ? (
                    <img
                      className="md:w-10 md:h-10 rounded-full shadow-md"
                      src={getSender(loggedUser, chat.users).pic}
                      alt="chat-pic"
                    />
                  ) : (
                     <img
                      className="md:w-10 md:h-10 rounded-full shadow-md"
                      src={chat.groupPic}
                      alt="chat-pic"
                    />
                  )}
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users).name
                    : chat.chatName}
                </div>
                {/* {chat.latestMessage && (
                  <div fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </div>
                )} */}
              </motion.div>
            ))}
          </ScrollableFeed>
        ) : (
          // <ChatLoading />
          "loading chats"
        )}
      </div>
    </div>
  );
};

export default MyChats;
