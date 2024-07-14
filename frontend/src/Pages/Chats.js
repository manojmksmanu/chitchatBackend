import axios from "axios";
import React, { useEffect } from "react";
import { ChatState } from "../context/ChatProvider";
import MyChats from "../component/misc/MyChats";
import ChatBox from "../component/misc/ChatBox";
import SideBar from "../component/misc/navbarmisc/SearchSideBar";
import SideNavBar from "../component/misc/SideNavBar";

const Chats = () => {
  const { user } = ChatState();
  return (
    <div className="h-screen bg-neutral-950 overflow-hidden">
      {/* <Navbar /> */}
      <SideNavBar />
      {/* Main Content */}

      <div className="flex gap-3 p-4 md:ml-12 bg-white h-screen m-2 rounded-2xl">
        <div className="w-2/6">{user && <MyChats />}</div>
        <div className="w-4/6">{user && <ChatBox />}</div>
      </div>
    </div>
  );
};
export default Chats;
