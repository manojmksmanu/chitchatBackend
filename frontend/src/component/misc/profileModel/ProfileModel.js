import React from "react";

const ProfileModel = ({ isOpen, setIsOpen, user }) => {
  if (!isOpen) {
    return null;
  }
  console.log(isOpen);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 md:p-0 p-6">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
        <div className="flex justify-between items-center border-b pb-3">
          <div></div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            &times;
          </button>
        </div>
        <div className="flex flex-col items-center mt-4">
          <h3 className="text-lg font-medium">{user.name}</h3>
          <img className="w-1/4 rounded-full" src={user.pic} />
          <h4>{user.email}</h4>
        </div>
      </div>
    </div>
  );
};

export default ProfileModel;
