import { useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";

type Props = {};

const activeBtnStyles =
   "bg-teal-500 text-white font-semibold py-2 px-5 rounded-xl w-28 outline-none";
const notActiveBtnStyles =
   "bg-primary text-black font-semibold py-2 px-5 rounded w-28 outline-none";

function Profile({}: Props) {
   const [activeBtn, setActiveBtn] = useState<string>("created");

   const { user } = useAuth();

   const name = "rahman";

   return (
      <div className="relative pb-2 h-full justify-center items-center">
         <div className="flex flex-col pb-5">
            <div className="relative flex flex-col mb-5">
               <div className="flex flex-col justify-center items-center">
                  <img
                     className=" w-full h-44 xl:h-64 shadow-lg object-cover"
                     src="https://source.unsplash.com/1600x900/?nature,photography,technology"
                     alt="user-pic"
                  />

                  <div className="capitalize bg-[#3E3D62] flex items-center justify-center text-5xl font-bold text-white rounded-full w-20 h-20 -mt-10 shadow-xl">
                     {name.charAt(0)}
                  </div>
               </div>
               <h1 className="font-bold text-3xl text-center mt-3">{user?.userName}</h1>
               <div className="absolute top-0 z-1 right-0 p-2">
                  <button
                     type="button"
                     className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                     //onClick={renderProps.onClick}
                     //disabled={renderProps.disabled}
                  >
                     <AiOutlineLogout color="red" fontSize={21} />
                  </button>
               </div>
            </div>
            <div className="flex justify-center space-x-2">
               <button
                  type="button"
                  onClick={(e) => {
                     setActiveBtn("created");
                  }}
                  className={`${activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles}`}
               >
                  Created
               </button>
               <button
                  type="button"
                  onClick={(e) => {
                     setActiveBtn("saved");
                  }}
                  className={`${activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles}`}
               >
                  Saved
               </button>
            </div>

            {/* <div className="px-2">
       <MasonryLayout pins={pins} />
     </div>

     {pins?.length === 0 && (
     <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
       No Pins Found!
     </div> 
     )}*/}
         </div>
      </div>
   );
}

export default Profile;
