import React, { useState } from "react";
import axios from "axios";
import { ChatState } from "../../../context/ChatProvider";
import { toast } from "react-toastify";
import Avtar from "../chatAvtar/Avtar";
import LoadingAvtar from "../chatAvtar/LoadingAvtar";
import { IoSearchCircleOutline } from "react-icons/io5";

const SearchSideBar = ({ openSearchBar, setOpenSearchBar }) => {
  const { user, setChats, chats, setSelectedChat, selectedChat } = ChatState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
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
      console.log(searchResult);
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
    // {
    //   searchResult? setNotFound(false) : setNotFound(true);
    // }
  };

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
      await setSelectedChat([data]);

      if (!chats.find((c) => c._id === data._id)) {
        return await setChats([data, ...chats]);
      }
      setLoadingChat(false);
      {
        loadingChat === false ? setOpenSearchBar(false) : <></>;
      }
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
    <div className="">
      <div
        id="drawer-navigation"
        className={`fixed inset-0 z-30 rounded-r-3xl shadow-2xl flex-none p-3 w-64 bg-neutral-50 text-white transition-transform transform ${
          openSearchBar ? "translate-x-0" : "-translate-x-full"
        }`}
        tabIndex="-1"
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
          onClick={() => setOpenSearchBar(false)}
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Close menu</span>
        </button>
        <div class="py-4 overflow-y-auto">
          <ul class="space-y-2 font-medium">
            <li className="flex">
              <input
                onChange={(e) => setSearch(e.target.value)}
                class="shadow-sm w-3/4 bg-purple-100 text-slate-900 font-light rounded-md focus:no-underline pl-2"
              />
              <IoSearchCircleOutline
                onClick={() => handleSearch()}
                className="w-1/4 text-3xl text-slate-600 cursor-pointer"
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
              : "sorry user not found"}
            {/* {notFound ?"" :"Soryy User Is Not Found"} */}
            {loadingChat && "loading chat"}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchSideBar;
