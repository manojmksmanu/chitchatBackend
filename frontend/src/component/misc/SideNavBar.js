import React, { useState, useRef, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { MdGroupAdd } from "react-icons/md";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../context/ChatProvider";
import SearchSideBar from "./navbarmisc/SearchSideBar";
import GroupChat from "./groupChatModel/GroupChat";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const SideNavBar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const { user, setUser } = ChatState();
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [openGroupBox, setOpenGroupBox] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const Logout = () => {
    setUser(null);
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex">
      <div
        className={`fixed inset-y-0 left-0 z-30 w-12 bg-neutral-950 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0`}
      >
        <div className="flex h-screen py-4 justify-between flex-col items-center">
          <div className="font-extrabold">
            C
            <motion.span
              animate={{
                rotate: [0, 20, -20, 0],
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="inline-block"
            >
              C
            </motion.span>
          </div>
          <ul>
            <li
              onClick={() => setOpenSearchBar(true)}
              className="cursor-pointer"
            >
              <CiSearch className="text-2xl text-slate-500 hover:text-slate-50 mt-2" />
            </li>
            <li
              onClick={() => setOpenGroupBox(true)}
              className="cursor-pointer"
            >
              <MdGroupAdd className="text-2xl text-slate-500 hover:text-slate-50 mt-2" />
            </li>
          </ul>
          <div className="relative inline-block text-left">
            {/* User profile pic */}
            <div>
              <div
                onClick={() => setMenuOpen((prev) => !prev)} // Toggle menu visibility
                className="flex items-center p-1 rounded-md bg-white focus:outline-none cursor-pointer"
                data-tooltip-id="my-tooltip-1"
              >
                <img className="w-5 h-5" src={user && user.pic} alt="Profile" />
              </div>
            </div>
            <ReactTooltip
              id="my-tooltip-1"
              place="bottom"
              content={user && user.name}
            />

            {/* Menu */}
            {menuOpen && (
              <div
                ref={menuRef}
                className="absolute -right-36 -top-28 mt-2 max-w-36 bg-white border border-gray-200 rounded-md shadow-lg"
              >
                <ul className="p-2">
                  <li className="pl-2 text-sm text-slate-800 hover:bg-gray-100 cursor-pointer">
                    {user && user.name}
                  </li>
                  <li className="pl-2 text-sm text-slate-800 hover:bg-gray-100 cursor-pointer">
                    {user && user.email}
                  </li>
                  <li
                    className="p-2 hover:bg-gray-700 cursor-pointer bg-slate-900 rounded-md mt-2"
                    onClick={() => Logout()}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <GroupChat
        openGroupBox={openGroupBox}
        setOpenGroupBox={setOpenGroupBox}
        setIsOpen={setIsOpen}
      />
      <SearchSideBar
        openSearchBar={openSearchBar}
        setOpenSearchBar={setOpenSearchBar}
        setIsOpen={setIsOpen}
      />
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}
    </div>
  );
};

export default SideNavBar;
