import React from "react";
import { ChatState } from "../context/ChatProvider";
import MyChats from "../component/misc/MyChats";
import ChatBox from "../component/misc/ChatBox";
import SideNavBar from "../component/misc/SideNavBar";

const Chats = () => {
  const { user, chats, selectedChat } = ChatState();
  console.log(chats);

  return (
    <div className="h-screen bg-neutral-950 overflow-hidden">
      <SideNavBar />
      <div className="flex gap-2 md:ml-12 bg-white h-screen m-2 rounded-2xl">
        <div
          className={`flex-shrink-0 w-full md:max-w-xs h-full md:block ${
            selectedChat ? "hidden md:block" : "block"
          } bg-slate-950 rounded-l-xl`}
        >
          {user && <MyChats />}
        </div>
        <div
          className={`flex-1 h-full ${
            selectedChat ? "block" : "hidden md:block"
          }`}
        >
          {user && <ChatBox />}
        </div>
      </div>
    </div>
  );
};

export default Chats;
