import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChatState } from "../../../context/ChatProvider";
import { toast } from "react-toastify";
import Avtar from "../chatAvtar/Avtar";
import LoadingAvtar from "../chatAvtar/LoadingAvtar";

const SideBar = () => {
  const { user, setChats, chats, setSelectedChat, selectedChat } = ChatState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(
          `http://localhost:5000/api/user?search=${search}`,
          config
        );
        setLoading(false);
        setSearchResult(data);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to Load the Search Results",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    };
    handleSearch();
  }, [search]);

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      console.log("inside try");
      const { data } = await axios.post(
        "http://localhost:5000/api/chat/chats",
        { _id: userId },
        config
      );
      await setSelectedChat(data);
      console.log(selectedChat, "selected chat");
      console.log(chats, "chats");
      console.log("after fetch");
      console.log(data, chats);
      setChats;
      if (!chats.find((c) => c._id === data._id)) {
        return await setChats([data, ...chats]);
      }

      setLoadingChat(false);
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <div>
      <div
        id="drawer-navigation"
        class="fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white dark:bg-gray-800"
        tabindex="-1"
        aria-labelledby="drawer-navigation-label"
      >
        <h5
          id="drawer-navigation-label"
          class="text-base font-semibold text-gray-500  dark:text-gray-400"
        >
          ChitChat😶‍🌫️
        </h5>
        <button
          type="button"
          data-drawer-hide="drawer-navigation"
          aria-controls="drawer-navigation"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Close menu</span>
        </button>
        <div class="py-4 overflow-y-auto">
          <ul class="space-y-2 font-medium">
            <li>
              <input
                onChange={(e) => setSearch(e.target.value)}
                class=" ms-3 bg-slate-100 rounded-md focus:no-underline pl-2"
              />
            </li>
            {loading && loading ? (
              <>
                <LoadingAvtar />
                <LoadingAvtar />
                <LoadingAvtar />
                <LoadingAvtar />
                <LoadingAvtar />
              </>
            ) : (
              ""
            )}
            {searchResult
              ? searchResult.map((user) => {
                  return (
                    <div key={user._id} onClick={() => accessChat(user._id)}>
                      <Avtar
                        data={user}
                        // handleFunction={(e) => accessChat(e._id)}
                        // onClick={()=>accessChat()}
                      />
                    </div>
                  );
                })
              : "Sorry User Not Found"}
            {loadingChat && "loading chat"}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
