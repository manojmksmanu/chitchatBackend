import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { FaRegMehRollingEyes } from "react-icons/fa";
import ProfileModel from "../misc/profileModel/ProfileModel";
import { FaRegEye } from "react-icons/fa6";
import UpdateGroupChat from "./updateGroupChatModel/UpdateGroupChat";
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat } = ChatState();
  const [isOpen, setIsOpne] = useState(false);
  const [groupDetails, setGroupDetails] = useState([]);
  const [updateGroupBox, setUpdateGroupBox] = useState(false);

  useEffect(() => {
    selectedChat && selectedChat.isGroupChat
      ? setGroupDetails(selectedChat)
      : setGroupDetails([]);
  }, [selectedChat]);
console.log(selectedChat)
  return (
    <div>
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
        </>
      ) : (
        <div>
          {" "}
          <h3>Click on a uer to start chatting</h3>{" "}
        </div>
      )}
      <div>Message Here</div>
    </div>
  );
};

export default SingleChat;
