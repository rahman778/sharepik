import React from "react";
import { useDropzone } from "react-dropzone";

interface Props {
   file: File | null;
   setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export default function ImageDropper({ file, setFile }: Props) {
   const { getRootProps, getInputProps } = useDropzone({
      maxFiles: 1,
      accept: {
         "image/*": [],
      },
      onDrop: (acceptedFiles) => {
         setFile(acceptedFiles[0]);
      },
   });

   return (
      <>
         {!file ? (
            <section className="container bg-neutral-200 cursor-pointer border-2 border-dashed border-white/50">
               <div {...getRootProps({ className: "flex items-center justify-center h-16" })}>
                  <input {...getInputProps()} />
                  <h6 className="text-stone-500 text-sm">Upload or Drag and drop the image</h6>
               </div>
            </section>
         ) : (
            <div className="relative">
               <button
                  type="button"
                  className="absolute top-1 right-1 text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  data-modal-toggle="authentication-modal"
                  onClick={() => setFile(null)}
               >
                  <svg
                     aria-hidden="true"
                     className="w-5 h-5"
                     fill="currentColor"
                     viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                     ></path>
                  </svg>
               </button>
               <img src={URL.createObjectURL(file)} style={{ width: "auto", maxHeight: 320 }} />
            </div>
         )}
      </>
   );
}
