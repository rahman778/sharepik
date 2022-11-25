import { useEffect, useState } from "react";
import { API, Auth, Storage } from "aws-amplify";

import { MdDownloadForOffline, MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { Post } from "../API";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";

type Props = {
   post: Post;
};

function Card({ post }: Props) {
   const router = useRouter();
   const { user } = useAuth();
   const [postImage, setPostImage] = useState<string | undefined>(undefined);

   // useEffect(() => {
   //    async function getImageFromStorage() {
   //       try {
   //          const signedURL = await Storage.get(post.image); // get key from Storage.list
   //          // @ts-ignore
   //          setPostImage(signedURL);
   //       } catch (error) {
   //          console.log("No image found.");
   //       }
   //    }

   //    getImageFromStorage();
   // }, []);

   return (
      <div
         className="cursor-pointer relative group rounded-md"
         onClick={() => router.push(`/post/${post.id}`)}
      >
         <div className="z-50 opacity-0 rounded-md group-hover:opacity-100 transition duration-300 ease-in-out cursor-pointer absolute pb-10 from-black/80 to-transparent bg-gradient-to-b inset-x-0 top-0 text-white flex items-center">
            <div className="w-full">
               <div className="px-4 space-y-3 text-xl group-hover:opacity-100 group-hover:translate-y-4 translate-y-0 transform transition duration-300 ease-in-out">
                  <div className="flex items-center justify-between">
                     <div className="flex gap-2">
                        <a
                           //href={`${image?.asset?.url}?dl=`}
                           download
                           onClick={(e) => {
                              e.stopPropagation();
                           }}
                           className="bg-white w-8 h-8 p-1 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                        >
                           <MdDownloadForOffline color="#000" />
                        </a>
                     </div>

                     <button
                        onClick={(e) => {
                           e.stopPropagation();
                           //savePin(_id);
                        }}
                        type="button"
                        //className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                     >
                        <MdOutlineFavoriteBorder
                           color="#FF5565"
                           fontSize={28}
                        ></MdOutlineFavoriteBorder>
                     </button>
                  </div>
               </div>
            </div>
         </div>
         <div className="z-50 opacity-0 rounded-md group-hover:opacity-100 transition duration-300 ease-in-out cursor-pointer absolute from-black/80 to-transparent bg-gradient-to-t inset-x-0 bottom-0 pt-20 text-white flex items-end">
            <div>
               <div className="p-4 space-y-3 text-xl group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transform transition duration-300 ease-in-out">
                  <div className="font-bold">{post?.title}</div>

                  <div className="opacity-60 text-sm ">{post?.description}</div>
               </div>
            </div>
         </div>
         {post.image && postImage && <img alt="" className="w-full rounded-md" src={postImage} />}
      </div>
   );
}

export default Card;
