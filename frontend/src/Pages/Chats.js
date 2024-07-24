import React from "react";
import { ChatState } from "../context/ChatProvider";
import MyChats from "../component/misc/MyChats";
import ChatBox from "../component/misc/ChatBox";
import SideNavBar from "../component/misc/SideNavBar";

const Chats = () => {
  const { user, chats, selectedChat } = ChatState();
  console.log(chats);
  // console.log(selectedChat)
  return (
    <div className="h-screen bg-neutral-950 overflow-hidden">
      {/* <Navbar /> */}
      <SideNavBar />
      {/* Main Content */}

      {/* {chats ? ( */}
        <div className="flex gap-2 md:ml-12 bg-white h-screen m-2 rounded-2xl">
          <div
            className={`md:min-w-80 md:block hidden bg-slate-950 rounded-l-xl`}
          >
            {user && <MyChats />}
          </div>
          <div className={`flex-1`}>{user && <ChatBox />}</div>
        </div>
      {/* ) : (
        <div className="bg-white text-black h h-screen flex justify-center items-center">
          "Loading"
        </div>
      )}  */}
    </div>
  );
};

export default Chats;
