import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { FaRegMehRollingEyes } from "react-icons/fa";
import ProfileModel from "../misc/profileModel/ProfileModel";
import { FaRegEye } from "react-icons/fa6";
import axios from "axios";
import UpdateGroupChat from "./updateGroupChatModel/UpdateGroupChat";
import { toast } from "react-toastify";
import ScrollableChat from "./scrollableChat/ScrollableChat";
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat } = ChatState();
  const [isOpen, setIsOpne] = useState(false);
  const [groupDetails, setGroupDetails] = useState([]);
  const [updateGroupBox, setUpdateGroupBox] = useState(false);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const fetchMessages = async (e) => {
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
      console.log(messages);
      setMessages(data);
      setLoading(false);
    } catch (error) {
      toast.error(error);
    }
  };
  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage && newMessage.trim().length) {
      console.log(newMessage, selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post(
          "http://localhost:5000/api/message/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        console.log(data);
        setNewMessage(" ");
        setMessages([...messages, data]);
      } catch (error) {
        toast.error(error);
      }
    } else {
      return null;
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    // Typing Indicator Logic
  };
  useEffect(() => {
    selectedChat && selectedChat.isGroupChat
      ? setGroupDetails(selectedChat)
      : setGroupDetails([]);
  }, [selectedChat]);
  return (
    <div className="h-full pb-6">
      {selectedChat.length !== 0 ? (
        <>
          <div className="flex justify-between items-center">
            <div>
              {selectedChat && !selectedChat.isGroupChat ? (
                <div>
                  {selectedChat.users.find((u) => u._id !== user._id).name}
                  {/* {selectedChat.users.filter((u) => u._id !== user._id)[0].name} */}
                </div>
              ) : (
                <div>{selectedChat.chatName}</div>
              )}
            </div>
            <div>
              {selectedChat && !selectedChat.isGroupChat ? (
                <FaRegMehRollingEyes
                  className="cursor-pointer"
                  onClick={(e) => setIsOpne(e)}
                />
              ) : (
                <FaRegEye
                  className="cursor-pointer"
                  onClick={() => setUpdateGroupBox(true)}
                />
              )}
            </div>

            <UpdateGroupChat
              updateGroupBox={updateGroupBox}
              setUpdateGroupBox={setUpdateGroupBox}
              //   groupDetails={groupDetails}
              //   fetchAgain={fetchAgain}
              //   setFetchAgain={setFetchAgain}
            />
            <ProfileModel
              user={selectedChat.users.find((u) => u._id !== user._id)}
              isOpen={isOpen}
              setIsOpen={setIsOpne}
            />
          </div>
          <div className="flex flex-col content-end justify-end w-full h-full ">
            {loading ? (
              "loading..."
            ) : (
              <div className=" flex flex-col overflow-y-hidden">
                <ScrollableChat messages={messages} />
              </div>
            )}

            {/* <form onSubmit={sendMessage}> */}
            <input
              className="mt-3 drop-shadow-lg p-2 pl-4 rounded-2xl"
              placeholder="enter a message"
              onChange={(e) => typingHandler(e)}
              value={newMessage}
              onKeyDown={sendMessage}
            />
            {/* </form> */}
          </div>
        </>
      ) : (
        <div>
          {" "}
          <h3>Click on a uer to start chatting</h3>{" "}
        </div>
      )}
    </div>
  );
};

export default SingleChat;
