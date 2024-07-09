import axios from "axios";
import React, { useEffect } from "react";
import { ChatState } from "../context/ChatProvider";
import Navbar from "../component/misc/Navbar";
import MyChats from "../component/misc/MyChats";
import ChatBox from "../component/misc/ChatBox";

const Chats = () => {
  const { user } = ChatState();
  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <div className="flex w-3/4 bg-slate-400 justify-between">
          {user && <MyChats />}
          {user && <ChatBox />}
        </div>
      </div>
    </div>
  );
};
export default Chats;
