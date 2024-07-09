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
    <div>
      <p className="text-red font-black">
        <Login />
      </p>
    </div>
  );
};

export default HomePage;
