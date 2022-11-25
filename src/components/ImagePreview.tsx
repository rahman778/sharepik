import Image from "next/image";

type Props = {
   image: string;
};

function ImagePreview({ image }: Props) {
   return (
      <div className="flex justify-center items-center md:items-start flex-initial">
         {image && (
            <div className="relative w-full h-96">
               <Image src={image} layout="fill" objectFit="contain" alt="preview" />
            </div>
         )}
      </div>
   );
}

export default ImagePreview;
