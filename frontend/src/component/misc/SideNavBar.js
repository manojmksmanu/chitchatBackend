import React, { useState } from "react";
import { CiChat1, CiSearch } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { ChatState } from "../../context/ChatProvider";
import { useNavigate } from "react-router-dom";
import SearchSideBar from "./navbarmisc/SearchSideBar";
import { MdGroupAdd } from "react-icons/md";
import GroupChat from "./groupChatModel/GroupChat";
const SideNavBar = () => {
  const navigate = useNavigate();
  const { user, setUser } = ChatState();
  const [isOpen, setIsOpen] = useState(false);
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [openGroupBox, setOpenGroupBox] = useState(false);

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
          <div className="font-extrabold">CC</div>
          <ul>
            <li className=" cursor-pointer">
              <CiChat1 className="text-2xl text-slate-500 hover:text-slate-50" />
              {/* <span className="text-xs" > All Chats</span> */}
            </li>
            <li></li>
            <li
              onClick={() => setOpenSearchBar(true)}
              className=" cursor-pointer"
            >
              <CiSearch className="text-2xl text-slate-500 hover:text-slate-50 mt-2" />
            </li>
            <li
              onClick={() => setOpenGroupBox(true)}
              className=" cursor-pointer"
            >
              <MdGroupAdd className="text-2xl text-slate-500 hover:text-slate-50 mt-2" />
            </li>
          </ul>
          {/* --user-- profile pic */}
          <div>
            <button
              type="button"
              data-tooltip-target="tooltip-default"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              {/* <span className="sr-only">Open user menu</span> */}
              <img
                className="w-8 h-8 rounded-full"
                src={user.pic && user.pic}
                alt="user photo"
              />
            </button>

            <div
              id="tooltip-default"
              role="tooltip"
              class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-slate-500 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              {user && user.name}
              <div class="tooltip-arrow" data-popper-arrow></div>
            </div>
            {/* <!-- on click menu for profile --> */}
            <div
              className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                  {user && user.name}
                </span>
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                  {user && user.email}
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <span
                    onClick={() => Logout()}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                  >
                    LogOut
                  </span>
                </li>
              </ul>
            </div>
            {/* <!--end  on click menu for profile --> */}
          </div>
        </div>
      </div>
      <GroupChat
        openGroupBox={openGroupBox}
        setOpenGroupBox={setOpenGroupBox}
      />
      <SearchSideBar
        openSearchBar={openSearchBar}
        setOpenSearchBar={setOpenSearchBar}
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
