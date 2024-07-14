import React from "react";
import { RxCross1 } from "react-icons/rx";
const SelectedUserBadge = ({ data, handleFunction }) => {
  console.log(data);
  return (
    <div
      onClick={handleFunction}
      className="bg-purple-600 text-white p-2 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-purple-400"
    >
      {data && data.name}
      <span>
        <RxCross1 />{" "}
      </span>{" "}
    </div>
  );
};

export default SelectedUserBadge;
