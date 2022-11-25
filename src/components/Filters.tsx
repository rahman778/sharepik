import Link from "next/link";
import Image from "next/image";
import { RiHomeFill } from "react-icons/ri";

import { categories } from "../utils/data";
import logo from "../../public/logo.png";

interface IProps {
   closeToggle?: (e: boolean) => void;
}

const isNotActiveStyle =
   "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
   "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize";

function Sidebar({ closeToggle }: IProps) {
   const handleCloseSidebar = () => {
      if (closeToggle) closeToggle(false);
   };

   const isActive = false;

   return (
      <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
         <div className="flex flex-col">
            <Link
               href="/"
               className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
               onClick={handleCloseSidebar}
            >
               <Image src={logo} alt="logo" layout="responsive" objectFit="contain" />
            </Link>
            <div className="flex flex-col gap-5">
               <Link href="/" onClick={handleCloseSidebar}>
                  <a className={isActive ? isActiveStyle : isNotActiveStyle}>
                     <RiHomeFill />
                     Home
                  </a>
               </Link>
               <h3 className="mt-2 px-5 text-base 2xl:text-xl">Discover cateogries</h3>
               {categories.slice(0, categories.length - 1).map((category) => (
                  <Link onClick={handleCloseSidebar} key={category.name} href={""}>
                     <a className={isActive ? isActiveStyle : isNotActiveStyle}>
                        <img src={category.image} className="w-8 h-8 rounded-full shadow-sm" />
                        {category.name}
                     </a>
                  </Link>
               ))}
            </div>
         </div>
      </div>
   );
}

export default Sidebar;
