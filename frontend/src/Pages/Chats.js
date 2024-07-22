import React from "react";
import { ChatState } from "../context/ChatProvider";
import MyChats from "../component/misc/MyChats";
import ChatBox from "../component/misc/ChatBox";
import SideNavBar from "../component/misc/SideNavBar";

const Chats = () => {
  const { user, chats } = ChatState();

  return (
    <div className="h-screen bg-neutral-950 overflow-hidden">
      {/* <Navbar /> */}
      <SideNavBar />
      {/* Main Content */}

      {chats ? (
        <div className="flex gap-3  md:ml-12 bg-white h-screen m-2 rounded-2xl">
          <div className="w-2/6 bg-slate-400 rounded-l-xl">
            {user && <MyChats />}
          </div>
          <div className="w-4/6">{user && <ChatBox />}</div>
        </div>
      ) : (
        <div className="bg-white text-black">"Loading"</div>
      )}
    </div>
  );
};
export default Chats;
