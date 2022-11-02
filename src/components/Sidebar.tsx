import React from "react";

type IProps = {
   open: boolean;
};

function Sidebar({ open }: IProps) {
   return (
      <div
         className={`top-0 right-0 w-screen bg-black p-10 text-white fixed h-full z-10 ease-in-out duration-300 ${
            open ? "translate-x-0 " : "translate-x-full"
         }`}
      >
         <ul className="p-0 list-none mt-10 flex flex-col h-5/6 items-center justify-around">
            <li className="px-5 py-1 rounded-sm border border-white">Submit a photo</li>
            <li className="">Login / Sign up</li>
         </ul>
      </div>
   );
}

export default Sidebar;
