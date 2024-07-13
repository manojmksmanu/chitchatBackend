import axios from "axios";
import React, { useState } from "react";
import { ChatState } from "../context/ChatProvider";
import MyChats from "../component/misc/MyChats";
import ChatBox from "../component/misc/ChatBox";
import SideNavBar from "../component/misc/SideNavBar";
const Chats = () => {
  const user = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <div className="h-screen bg-neutral-950 overflow-hidden">
      <SideNavBar />
      {/* Main Content */}
      <div className="flex gap-3 p-4 md:ml-12 bg-white h-screen m-2 rounded-2xl">
        <div className="w-2/6">
          {user && <MyChats fetchAgain={fetchAgain} />}
        </div>
        <div className="w-4/6">
          {user && (
            <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </div>
      </div>
    </div>
  );
};
export default Chats;
