import { MdDownloadForOffline, MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";

type Props = {
   img: string;
};

function Card({ img }: Props) {
   return (
      <div className="cursor-pointer relative group rounded-md">
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
                  <div className="font-bold">Jessie Watsica</div>

                  <div className="opacity-60 text-sm ">
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio dolores
                  </div>
               </div>
            </div>
         </div>
         <img alt="" className="w-full rounded-md" src={img} />
      </div>
   );
}

export default Card;
