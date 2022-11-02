import { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiSearch, FiPlus } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

import logo from "../../../public/logo.png";
import Hamburger from "./hamburger";
import Sidebar from "../Sidebar";

interface IProps {
   searchTerm: string;
   setSearchTerm: Dispatch<SetStateAction<string>>;
}

const Navbar = ({ searchTerm, setSearchTerm }: IProps) => {
   const { user } = useAuth();

   const [open, setOpen] = useState(false);

   return (
      <>
         <div className="flex bg-[#171544] gap-2 align-center justify-between md:gap-5 w-full p-4">
            <div className="w-32 my-auto">
               <Image src={logo} alt="logo" layout="responsive" objectFit="contain" />
            </div>
            <div className="hidden md:flex justify-start items-center grow max-w-xl px-2 rounded-sm bg-[#3e3d62] outline-none focus-within:shadow-sm">
               <input
                  type="text"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search images"
                  value={searchTerm}
                  //onFocus={() => navigate('/search')}
                  className="px-4 py-2 w-full bg-[#3e3d62] font-medium outline-none text-sm text-white placeholder-zinc-400"
               />
               <FiSearch color="#fff" fontSize={20} className="mr-2" />
            </div>

            <div className="hidden md:flex gap-x-6 my-auto items-center">
               {/* <Link href={`user-profile/${user?._id}`} className="hidden md:block">
                  <img src={user.image} alt="user-pic" className="w-14 h-12 rounded-lg " />
               </Link> */}
               <Link href="/create-pin">
                  <a className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-md w-12 h-12 md:w-10 md:h-10 flex justify-center items-center">
                     <FiPlus color="#fff" fontSize={20} />
                  </a>
               </Link>
               <Link href="/create-pin">
                  <a className=" text-white font-semibold text-sm">Log in</a>
               </Link>

               <button className="text-white text-sm font-semibold bg-transparent border border-white px-4 py-1 rounded">
                  Sign up
               </button>
            </div>
            <div className="block md:hidden z-20">
               <Hamburger open={open} setOpen={setOpen} />
            </div>
            <Sidebar open={open} />
         </div>
      </>
   );
};

export default Navbar;