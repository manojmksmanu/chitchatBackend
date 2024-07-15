import React, { useState } from "react";
import { ChatState } from "../../../context/ChatProvider";
import axios from "axios";
import Avatar from "../chatAvtar/Avtar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SelectedUserBadge from "./SelectedUserBadge";

const GroupChat = ({ openGroupBox, setOpenGroupBox, groupDetails }) => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const { user, chats, setChats } = ChatState();
  const [selectedUser, setSelectedUser] = useState([]);
  console.log(selectedUser, "selected user");
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

  const handleGroup = (userToAdd) => {
    if (selectedUser && selectedUser.find((u) => u._id === userToAdd._id)) {
      toast.warn("User already added");
    } else {
      setSelectedUser([...selectedUser, userToAdd]);
      toast.success("User added successfully");
    }
  };
  const handleRemove = (userToRemove) => {
    setSelectedUser(
      selectedUser.filter((user) => user._id !== userToRemove._id)
    );
    toast.success("User removed successfully");
  };
  const handleSubmit = async () => {
    if (!groupChatName || !selectedUser) {
      toast.warning("please fill all the fields");
      return;
    }
    if (chats.chatName === groupChatName) {
      toast.warning("Name is already used");
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `http://localhost:5000/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUser.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      setLoading(false);
      toast.success("Group is Created ");
      setOpenGroupBox(false);
    } catch (error) {
      toast.error("Group Not Created", error);
    }
  };

  if (!openGroupBox) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-medium">Create Group Chat</h3>
          <button
            onClick={() => setOpenGroupBox(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <div className="flex flex-col mt-4">
          <form>
            <input
              className="mb-2 p-2 border rounded w-full"
              placeholder="Group Name"
              onChange={(e) => setGroupChatName(e.target.value)}
              value={groupChatName}
            />
            <input
              className="mb-2 p-2 border rounded w-full"
              placeholder="Search Users You want to add in a group"
              onChange={(e) => handleSearch(e.target.value)}
              value={search}
            />
          </form>
          {/* render Selected user */}
          <div className="flex gap-2 flex-wrap">
            {selectedUser &&
              selectedUser.map((user) => (
                <div
                  key={user._id}
                  className="mt-2"
                  onClick={() => handleRemove(user)}
                >
                  <SelectedUserBadge
                    data={user}
                    //   handleFuntion={(e) => handleRemove(e)}
                  />
                </div>
              ))}
          </div>
          {loading ? <div>Loading...</div> : null}
          {searchResult &&
            searchResult.map((user) => (
              <div
                className="mt-2 cursor-pointer"
                key={user._id}
                onClick={() => handleGroup(user)}
              >
                <Avatar data={user} />
              </div>
            ))}
        </div>
        <div className="mt-4 text-right">
          <button
            onClick={() => handleSubmit()}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Create Group
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default GroupChat;
