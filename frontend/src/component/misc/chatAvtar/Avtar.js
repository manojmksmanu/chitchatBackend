import React from "react";

const Avtar = ({ data, handleFuntion }) => {
  return (
    <>
      <div>
        <span
          onClick={handleFuntion}
          class="flex items-center p-2 cursor-pointer text-gray-900 rounded-lg dark:text-white bg-slate-100 hover:bg-gray-200 dark:hover:bg-gray-700 group"
        >
          <img
            class="w-5 h-5 text-gray-500 transition duration-75 rounded-full dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            aria-hidden="true"
            src={data.pic}
          />

          <span class="ms-3">{data.name}</span>
        </span>
      </div>
    </>
  );
};

export default Avtar;
