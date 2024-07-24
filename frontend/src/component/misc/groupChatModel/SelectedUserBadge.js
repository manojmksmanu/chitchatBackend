import React from "react";
import { RxCross1 } from "react-icons/rx";
const SelectedUserBadge = ({ data }) => {
  console.log(data);
  return (
    <div className="bg-slate-800 text-white p-2 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-slate-700">
      {data && data.name}
      <span>
        <RxCross1 />{" "}
      </span>{" "}
    </div>
  );
};

export default SelectedUserBadge;
