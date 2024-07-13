import React, { useState } from "react";
import { ChatState } from "../../../context/ChatProvider";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import SelectedUserBadge from "../groupChatModel/SelectedUserBadge";
import Avtar from "../chatAvtar/Avtar";
import { query } from "express";
const UpdateGroupModel = ({
  openGroupBox,
  setOpenGroupBox,
  groupDetails,
  setGroupDetails,
  fetchAgain,
  setFetchAgain,
}) => {
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);
  const { user, chats, setChats, selectedChat, setSelectedChat } = ChatState();
  console.log(selectedChat);

  const handleRemoveUser = async (u) => {
    console.log(u);
    if (selectedChat.groupAdmin._id !== user._id && u._id !== user._id) {
      toast({
        title: "Only admins can remove someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:5000/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: u._id,
        },
        config
      );
      // console.log
      console.log(data, "data");
      console.log(u._id === user._id);
      u._id === user._id ? setSelectedChat() : setSelectedChat(data);
      console.log(selectedChat);
      //   setFetchAgain(!fetchAgain);
      toast.success($`{u.name} removed from the ${selectedChat.chatName}`);
      //   fetchMessages();
      setLoading(false);
    } catch {}
  };
  const handleGroupRename = async () => {
    if (!groupChatName) return;
    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:5000/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );
      // console.log
      console.log(data, "data");
      setSelectedChat(data);
      console.log(selectedChat);
      toast.success(`group name updated`);
      setRenameLoading(false);
      setGroupChatName("");
    } catch {}
  };
  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    if (user) {
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(
          `http://localhost:5000/api/user?search=${query}`,
          config
        );
        setLoading(false);
        setSearchResult(data);
      } catch (error) {
        setLoading(false);
        toast.error("Failed to load search results");
      }
    }
  };
//   const handleAddUser = async (u) => {
//     if (selectedChat.users.find((user) => user._id === u._id)) {
//       toast({
//         title: "User Already in group!",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       return;
//     }

//     if (selectedChat.groupAdmin._id !== user._id) {
//       toast.error("only admin can add user");
//       return;
//     }

//     try {
//       setSearchLoading(true);
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       };
//       const { data } = await axios.put(
//         `http://localhost:5000/api/chat/groupadd`,
//         {
//           chatId: selectedChat._id,
//           userId: u._id,
//         },
//         config
//       );

//       setSelectedChat(data);
//       //   setFetchAgain(!fetchAgain);
//       setLoading(false);
//     } catch (error) {
//       toast({
//         title: "Error Occured!",
//         description: error.response.data.message,
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       setSearchLoading(false);
//     }
//     setGroupChatName("");
//   };
  if (!openGroupBox) {
    return null;
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-medium">{groupDetails.chatName}</h3>
          <button
            onClick={() => setOpenGroupBox(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {groupDetails.users.map((u) => (
            <div className="" key={u._id} onClick={() => handleRemoveUser(u)}>
              <SelectedUserBadge data={u} />
            </div>
          ))}
        </div>
        <div className="flex gap-2 my-2">
          <input
            placeholder="Rename"
            className="bg-slate-400 rounded-lg p-1 w-3/4 pl-3 text-white"
            value={groupChatName}
            onChange={(e) => setGroupChatName(e.target.value)}
          />
          <span
            className="bg-purple-900 text-white p-1 rounded-md w-1/4 text-center"
            onClick={() => handleGroupRename()}
          >
            {renameloading ? (
              <div role="status flex justify-center">
                <svg
                  aria-hidden="true"
                  class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                <span class="sr-only">Loading...</span>
              </div>
            ) : (
              "Update"
            )}
          </span>
        </div>
        <div className="">
          <input
            className="w-full p-1 pl-3 bg-slate-400 rounded-md"
            placeholder="Add users"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div>
          {searchLoading ? <div>Loading...</div> : null}
          {searchResult &&
            searchResult.map((user) => (
              <div
                className="mt-2 cursor-pointer"
                key={user._id}
                onClick={() => handleAddUser(user)}
              >
                <Avtar data={user} />
              </div>
            ))}
        </div>
        <div className="mt-4 text-right">
          
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateGroupModel;
