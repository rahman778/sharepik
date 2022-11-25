import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Auth } from "aws-amplify";
import { AiOutlineLogout } from "react-icons/ai";
import { CognitoUser } from "@aws-amplify/auth";

type Props = {
   user: CognitoUser;
};

function Dropdown({ user }: Props) {
   const router = useRouter();

   const [showDropdown, setShowDropdown] = useState<boolean>(false);

   const signUserOut = async () => {
      await Auth.signOut();
      setShowDropdown(false);
   };

   const onLinkClick = (link: string) => {
      setShowDropdown(false);
      router.push(link);
   };
   return (
      <>
         <div
            className={`${
               showDropdown ? "block" : "hidden"
            } w-full h-full fixed z-[80] left-0 top-0 bg-[#171544]/50`}
            onClick={() => setShowDropdown(false)}
         ></div>
         <div className="relative">
            <button
               data-dropdown-toggle="dropdownAvatarName"
               className="flex items-center text-sm font-medium text-white rounded-full hover:text-cyan-500 md:mr-0 capitalize"
               type="button"
               onClick={() => setShowDropdown(!showDropdown)}
            >
               <span className="sr-only">Open user menu</span>
               {user?.attributes?.email.substring(0, user?.attributes?.email.indexOf("@"))}
               <svg
                  className="w-4 h-4 mx-1.5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     fillRule="evenodd"
                     d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                     clipRule="evenodd"
                  ></path>
               </svg>
            </button>
            <div
               className={`${
                  showDropdown ? "block" : "hidden"
               } absolute z-[90] w-44 py-2 px-4 bg-white rounded divide-y divide-gray-100 shadow right-0 top-10`}
            >
               <ul
                  className="py-1 text-sm text-gray-700 hover:text-teal-500"
                  aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton"
               >
                  <li className="cursor-pointer ">
                     <a onClick={() => onLinkClick(`/profile/${user?.username}`)}>Profile</a>
                  </li>
               </ul>
               <div className="py-1 flex items-center" onClick={signUserOut}>
                  <button
                     type="button"
                     className=" bg-white p-1 rounded-full cursor-pointer outline-none shadow-md mr-2"
                  >
                     <AiOutlineLogout color="#374151" fontSize={16} />
                  </button>
                  <button className="block py-2 text-sm text-gray-700">Sign out</button>
               </div>
            </div>
         </div>
      </>
   );
}

export default Dropdown;
