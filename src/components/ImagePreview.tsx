import Image from "next/image";
import { useState, useEffect } from "react";
import { Storage } from "aws-amplify";

type Props = {
   imageId: string;
};

function ImagePreview({ imageId }: Props) {
   const [postImage, setPostImage] = useState<string | undefined>(undefined);

   useEffect(() => {
      async function getImageFromStorage() {
         try {
            const signedURL = await Storage.get(imageId); // get key from Storage.list
            // @ts-ignore
            setPostImage(signedURL);
         } catch (error) {
            console.log("No image found.");
         }
      }

      getImageFromStorage();
   }, [imageId]);

   return (
      <div className="flex justify-center items-center md:items-start flex-initial">
         {imageId && postImage && (
            <div className="relative w-full h-96">
               <Image src={postImage} layout="fill" objectFit="contain" alt="preview" />
            </div>
         )}
      </div>
   );
}

export default ImagePreview;
