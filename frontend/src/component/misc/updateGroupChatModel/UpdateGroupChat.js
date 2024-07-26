import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ChatState } from "../../../context/ChatProvider";
import SelectedUserBadge from "../../misc/groupChatModel/SelectedUserBadge";
import axios from "axios";
import Avtar from "../chatAvtar/Avtar";
const UpdateGroupChat = ({
  updateGroupBox,
  setUpdateGroupBox,
  setFetchAgain,
  fetchAgain,
}) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [searchResult, setSearchResult] = useState();
  const [rename, setRename] = useState("");
  const [loading, setLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const handleRenameGroup = async () => {
    if (!rename) return;
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "http://localhost:5000/api/chat/rename",
        {
          chatId: selectedChat._id,
          chatName: rename,
        },
        config
      );
      setSelectedChat(data);
      toast.success(`group name updated`);
      setFetchAgain(!fetchAgain);
      setRename("");
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to Rename",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  const handleRemoveUser = async (u) => {
    if (user._id !== selectedChat.groupAdmin._id) {
      toast.error("only admin can remove user");
      return;
    }
    setRemoveLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "http://localhost:5000/api/chat/groupremove",
        {
          chatId: selectedChat._id,
          userId: u._id,
        },
        config
      );
      u._id === user._id ? setSelectedChat() : setSelectedChat(data);
      toast.success(`${u.name} removed from the ${selectedChat.chatName}`);
      setRemoveLoading(false);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to Rename",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  const handleLeaveUser = async (u) => {
    if (user._id === u._id) {
      setRemoveLoading(true);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.put(
          "http://localhost:5000/api/chat/groupremove",
          {
            chatId: selectedChat._id,
            userId: u._id,
          },
          config
        );
        u._id === user._id ? setSelectedChat() : setSelectedChat(data);
        toast.success(`You Just Leave The group : ${selectedChat.chatName}`);
        setRemoveLoading(false);
      } catch (error) {
        toast({
          title: "Error Occurred!",
          description: "Failed to Rename",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    }
  };
  const handleSearchUser = async (u) => {
    if (!u) {
      return;
    }

    if (user) {
      setSearchLoading(false);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(
          `http://localhost:5000/api/user?search=${u}`,
          config
        );
        setSearchLoading(false);
        setSearchResult(data);
      } catch (error) {
        setSearchLoading(false);
        toast.error("Failed to load search results");
      }
    }
  };
  const handleAddUser = async (u) => {
    if (selectedChat.users.find((user) => user._id === u._id)) {
      toast.error("User is already in group");
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      toast.error("only admin can add user");
      return;
    }

    try {
      setSearchLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:5000/api/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: u._id,
        },
        config
      );
      setSelectedChat(data);
      setSearchLoading(false);
      toast.success(`${u.name} is added to group`);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setSearchLoading(false);
    }
  };
  if (!updateGroupBox) {
    return null;
  }
  console.log(selectedChat);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 md:p-0 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
        <div className="flex justify-between items-center border-b pb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium">{selectedChat.chatName}</h3>
            {selectedChat.groupAdmin._id === user._id ? (
              <span
                className="bg-slate-800 text-white text-xs p-1 rounded-md cursor-pointer"
                onClick={() => handleRemoveUser(user)}
              >
                {" "}
                Destroy Group
              </span>
            ) : (
              <span
                className="bg-slate-800 text-white text-xs p-1 rounded-md cursor-pointer"
                onClick={() => handleLeaveUser(user)}
              >
                {" "}
                Leave Group
              </span>
            )}
          </div>

          <button
            onClick={() => setUpdateGroupBox(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>

        {/* ////bottom of line ///  */}
        <div className="h-full update_group_scroll">
          <div className="max-h-52 h-full overflow-y-auto p-2  z-50 ">
            <div className="flex flex-col mt-4 ">
              <form className="w-full flex gap-2">
                <input
                  className="w-2/3 pl-3 text-sm rounded-md bg-white drop-shadow-lg text-black placeholder:text-slate-800"
                  placeholder="Rename Group Name"
                  value={rename}
                  onChange={(e) => setRename(e.target.value)}
                />
                <span
                  className="w-1/3 bg-slate-950 text-white p-1 text-center rounded-md cursor-pointer"
                  onClick={handleRenameGroup}
                >
                  {!loading ? (
                    "Update"
                  ) : (
                    <div
                      role="status"
                      className="flex w-full justify-center p-1"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-100"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  )}
                </span>
              </form>
              {/* Users of this group */}
              {selectedChat.groupAdmin._id === user._id ? (
                <div className="flex gap-2 flex-wrap mt-4">
                  {selectedChat.users.map((u) => {
                    return user._id !== u._id ? (
                      <div key={u._id} onClick={() => handleRemoveUser(u)}>
                        <SelectedUserBadge data={u} />
                      </div>
                    ) : null;
                  })}
                </div>
              ) : (
                <div className="flex gap-2 flex-wrap mt-4">
                  {selectedChat.users.map((u) => {
                    return user._id !== u._id ? (
                      <div
                        key={u._id}
                        className="flex gap-2 items-center p-1 justify-center drop-shadow-md bg-slate-100 rounded-md"
                      >
                        <img
                          src={u.pic}
                          className="w-5 h-5 rounded-full drop-shadow-md"
                          alt="user"
                        />
                        <span>{u.name}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              )}
              {/* Add user section */}
              {selectedChat.groupAdmin._id === user._id && (
                <div>
                  <input
                    placeholder="Search users to add in this group"
                    className="w-full mt-3 my-2 p-1 pl-3 rounded-md bg-white-500 drop-shadow-md text-slate-800 placeholder:text-slate-800"
                    onChange={(e) => handleSearchUser(e.target.value)}
                  />
                  {searchLoading && <div>Loading...</div>}
                  {searchResult &&
                    searchResult.map((u) => (
                      <div
                        className="mt-2 cursor-pointer"
                        key={u._id}
                        onClick={() => handleAddUser(u)}
                      >
                        <Avtar data={u} />
                      </div>
                    ))}
                </div>
              )}
              {/* Add user section end */}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateGroupChat;
