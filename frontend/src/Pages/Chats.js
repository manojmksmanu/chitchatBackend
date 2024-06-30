import axios from "axios";
import React, { useEffect } from "react";

const Chats = () => {
  console.log("on chat page");
  const fetchData = async () => {
    console.log('inside funciton')
    const { data } = await axios.get("http://localhost:5000/api/chat");
    console.log(data);
    console.log("how are you ");
  };
  console.log("below function")
  useEffect(() => {
    fetchData();
  }, []);
  return <div>Chats</div>;
};

export default Chats;
