import Image from "next/image";

interface IProps {
   name: string;
   image: string;
   onCategoryClick: React.MouseEventHandler<HTMLDivElement>;
}

function Category({ name, image, onCategoryClick }: IProps) {
   return (
      <div className="text-black w-[170px] ml-6 group" onClick={onCategoryClick}>
         <div className="bg-white/10 w-[120px] h-[120px] p-[3px] my-0 mx-auto rounded-full">
            <div className="border-[3px] overflow-hidden border-cyan-500 bg-cyan-500 rounded-full">
               <div className="">
                  <Image
                     src={image}
                     alt="Profile"
                     width={200}
                     height={200}
                     layout="responsive"
                     className="rounded-full opacity-95 group-hover:scale-110 group-hover:opacity-100 transition duration-300 ease-in-out"
                     objectFit="cover"
                  />
               </div>
            </div>
         </div>
         <h3 className="text-center mt-4 text-slate-200 text-sm tracking-wider capitalize">
            {name}
         </h3>
      </div>
   );
}

export default Category;
