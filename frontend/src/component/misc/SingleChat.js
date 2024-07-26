import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import ProfileModel from "../misc/profileModel/ProfileModel";
import axios from "axios";
import UpdateGroupChat from "./updateGroupChatModel/UpdateGroupChat";
import { toast } from "react-toastify";
import ScrollableChat from "./scrollableChat/ScrollableChat";
import io from "socket.io-client";
import Lottie from "react-lottie";
import animationData from "../Animations/typing.json";
import MessageLoading from "../Animations/myMessageLoading.json";
import { motion, AnimatePresence } from "framer-motion";
import { CiMenuKebab } from "react-icons/ci";
import { FaArrowCircleLeft } from "react-icons/fa";

const ENDPOINT = "http://localhost:5000";
let socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain, setIsOpen }) => {
  const { user, selectedChat, setSelectedChat, notification, setNotification } =
    ChatState();
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [groupDetails, setGroupDetails] = useState([]);
  const [updateGroupBox, setUpdateGroupBox] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  console.log(messages);
  const typingIndicatorOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  let typingTimeout;

  useEffect(() => {
    socket = io(ENDPOINT);
    user && socket.emit("setup", user);

    socket.on("connection", () => {
      setSocketConnected(true);
    });
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
    // Clean up
    return () => {
      socket.off("typing");
      socket.off("stop typing");
      if (typingTimeout) clearTimeout(typingTimeout);
    };
  }, [user]);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);
      setFetchAgain(!fetchAgain);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast.error("Error fetching messages");
      setLoading(false);
    }
  };
  console.log(notification, "---");
  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage.trim()) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post(
          "http://localhost:5000/api/message/message",
          { content: newMessage, chatId: selectedChat._id },
          config
        );
        setNewMessage("");
        setFetchAgain(!fetchAgain);
        socket.emit("new message", data);
        setMessages([...messages, data]);
        socket.emit("stop typing", selectedChat._id);
      } catch (error) {
        toast.error("Error sending message");
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    if (typingTimeout) clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      setTyping(false);
      socket.emit("stop typing", selectedChat._id);
    }, 3000); // 3 seconds
  };
  // --notification if receiver user not chatting with sender user --
  useEffect(() => {
    socket.on("messageR", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat
      ) {
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  }, [messages]);

  useEffect(() => {
    if (selectedChat && selectedChat.isGroupChat) {
      setGroupDetails(selectedChat);
    } else {
      setGroupDetails([]);
    }
  }, [selectedChat]);

  return (
    <div className="h-full pb-1 flex flex-col w-full">
      {(Array.isArray(selectedChat) && selectedChat.length === 0) ||
      !selectedChat ? (
        <div className="flex items-center justify-center flex-grow">
          <h3>Click on a user to start chatting</h3>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center md:p-4 text-black">
            {!selectedChat.isGroupChat ? (
              <div className="flex gap-2  items-center">
                <FaArrowCircleLeft
                  className="md:hidden visible text-slate-700"
                  onClick={() => setSelectedChat()}
                />

                <img
                  className="w-10 h-10 rounded-full"
                  src={
                    (selectedChat.users &&
                      selectedChat.users.find((u) => u._id !== user._id)
                        ?.pic) ||
                    "User not found"
                  }
                />
                <span className="font-medium">
                  {" "}
                  {(selectedChat.users &&
                    selectedChat.users.find((u) => u._id !== user._id)?.name) ||
                    "User not found"}
                </span>

                {isTyping && (
                  <motion.div
                    className="flex items-center justify-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    style={{ backgroundColor: "transparent" }}
                  >
                    <Lottie
                      options={typingIndicatorOptions}
                      height={40}
                      width={70}
                      style={{
                        marginBottom: 15,
                        marginLeft: 0,
                        borderRadius: 100,
                      }}
                    />
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {" "}
                <FaArrowCircleLeft
                  className="md:hidden visible text-slate-700"
                  onClick={() => setSelectedChat()}
                />
                {selectedChat.chatName}
              </div>
            )}

            <div>
              {!selectedChat.isGroupChat ? (
                <CiMenuKebab
                  className="cursor-pointer"
                  onClick={() => setIsOpenProfile(true)}
                />
              ) : (
                <CiMenuKebab
                  className="cursor-pointer"
                  onClick={() => setUpdateGroupBox(true)}
                />
              )}
            </div>
            <UpdateGroupChat
              updateGroupBox={updateGroupBox}
              setUpdateGroupBox={setUpdateGroupBox}
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
            />
            <ProfileModel
              user={
                selectedChat.users &&
                selectedChat.users.find((u) => u._id !== user._id)
              }
              isOpen={isOpenProfile}
              setIsOpen={setIsOpenProfile}
            />
          </div>
          <div className="flex flex-col flex-grow overflow-hidden ">
            {loading ? (
              <div className="flex items-center justify-center flex-grow">
                <motion.div
                  className="flex items-center justify-center z-10"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  style={{ backgroundColor: "transparent" }}
                >
                  <Lottie options={typingIndicatorOptions} />
                </motion.div>
              </div>
            ) : (
              <div className="flex flex-col flex-grow overflow-hidden">
                <ScrollableChat messages={messages} />
              </div>
            )}
            <input
              className="mt-3 p-2 pl-4 rounded-md border border-gray-300 "
              placeholder="Enter a message"
              onChange={typingHandler}
              value={newMessage}
              onKeyDown={sendMessage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SingleChat;
