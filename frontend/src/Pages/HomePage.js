import React, { useEffect } from "react";
import Login from "../component/Authentication/Login&Signup";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      navigate("/chats");
    }
  }, [navigate]);
  return (
    <div className="overflow-y-auto">
        <Login />
    
    </div>
  );
};

export default HomePage;
