import React, { useState, useEffect } from "react";
import { ChatState } from "../../context/ChatProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { getSender } from "../../config/ChatLogic";
import { IoSearchOutline } from "react-icons/io5";
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
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    setLoggedUser(storedUser);
    fetchChats();
  }, [user]);
  return (
    <div className="">
      <div className="relative ">
        {/* <IoSearchOutline className="absolute top-1/2 transform translate-x-1/2" /> */}
        <input
          placeholder="Search"
          className="w-full bg-purple-200 rounded-xl p-1  placeholder:text-sm pl-5 text-black"
        />
      </div>

      <div>
        {chats ? (
          <div className="w-full">
            {chats.map((chat) => (
              <div
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                className={
                  selectedChat._id === chat._id
                    ? "bg-purple-100  px-3 py-2 border-blue-100 rounded-xl mt-1 cursor-pointer"
                    : " px-3 py-2  bg-slate-50  rounded-xl mt-1 cursor-pointer"
                }
              >
                <div className="flex flex-wrap items-center gap-2">
                  <img
                    className="md:w-10 md:h-10 rounded"
                    src={
                      !chat.isGroupChat
                        ? getSender(loggedUser, chat.users).pic
                        : chat.chatName
                    }
                  />
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
              </div>
            ))}
          </div>
        ) : (
          // <ChatLoading />
          "loading chats"
        )}
      </div>
    </div>
  );
};

export default MyChats;
