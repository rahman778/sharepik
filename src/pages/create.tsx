import React, { ReactElement, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { API, Storage } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";

import { createPost } from "../graphql/mutations";
import { CreatePostInput, CreatePostMutation } from "../API";

import SubmitButton from "../components/forms/SubmitButton";
import ImageDropper from "../components/ImageDropper";
import { categories } from "../utils/data";

interface IFormInput {
   title: string;
   description: string;
   category: string;
}

interface Props {}

export default function Create({}: Props): ReactElement {
   const [file, setFile] = useState<File | null>(null);
   const [fileError, setFileError] = useState<boolean>(false);

   const router = useRouter();

   const {
      register,
      formState: { errors },
      handleSubmit,
   } = useForm<IFormInput>();

   const onSubmit: SubmitHandler<IFormInput> = async (data) => {
      console.log(file);
      console.log(data);

      if (!file) {
         setFileError(true);
         return;
      }

      // User uploaded file
      // Send a request to upload to the S3 Bucket.
      try {
         const imagePath = uuidv4();

         await Storage.put(imagePath, file, {
            contentType: file.type, // contentType is optional
         });

         const createNewPostInput: CreatePostInput = {
            title: data.title,
            description: data.description,
            image: imagePath,
         };

         const res = (await API.graphql({
            query: createPost,
            variables: { input: createNewPostInput },
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
         })) as { data: CreatePostMutation };

         console.log("New post created successfully:", res);

         router.push(`/post/${res.data.createPost.id}`);
      } catch (error) {
         console.error("Error uploading file: ", error);
      }
   };

   return (
      <div className="container max-w-xl mx-auto">
         <h2 className="text-center text-2xl mt-8 font-semibold text-gray-800">Create Post</h2>
         <form onSubmit={handleSubmit(onSubmit)} className="mt-4" autoComplete="off">
            <div>
               {/* Title of the post */}
               <div className="mb-4 relative">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                     Title
                  </label>
                  <input
                     id="title"
                     type="text"
                     className="shadow-sm appearance-none border rounded-sm w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     {...register("title", {
                        required: { value: true, message: "Please enter a title." },
                        maxLength: {
                           value: 120,
                           message: "Please enter a title that is 120 characters or less.",
                        },
                     })}
                  />
                  <p
                     className={`absolute text-xs text-red-600 ${
                        errors.title ? "visible" : "invisible"
                     }`}
                  >
                     {errors.title ? errors.title.message : " "}
                  </p>
               </div>
               {/* Contents of the post */}
               <div className="mb-4 relative">
                  <label
                     className="block text-gray-700 text-sm font-bold mb-2"
                     htmlFor="description"
                  >
                     Description
                  </label>
                  <input
                     id="description"
                     type="text"
                     className="shadow-sm appearance-none border rounded-sm w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     {...register("description", {
                        required: {
                           value: true,
                           message: "Please enter some description for your post.",
                        },
                        maxLength: {
                           value: 1000,
                           message: "Please make sure your description is 1000 characters or less.",
                        },
                     })}
                  />
                  <p
                     className={`absolute text-xs text-red-600 ${
                        errors.description ? "visible" : "invisible"
                     }`}
                  >
                     {errors.description ? errors.description.message : " "}
                  </p>
               </div>
               {/* Category of the post */}
               <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                     Category
                  </label>
                  <select
                     id="category"
                     className="shadow-sm appearance-none border rounded-sm w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     {...register("category", {
                        required: {
                           value: true,
                           message: "Please select category for your post.",
                        },
                     })}
                  >
                     {categories.map((category) => (
                        <option className="capitalize" key={category.id} value={category.name}>
                           {category.name}
                        </option>
                     ))}
                  </select>
                  <p
                     className={`absolute text-xs text-red-600 ${
                        errors.category ? "visible" : "invisible"
                     }`}
                  >
                     {errors.category ? errors.category.message : " "}
                  </p>
               </div>
               {/* Image of the post */}
               <div className="mb-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                     Image
                  </label>
                  <ImageDropper file={file} setFile={setFile} />
                  <p
                     className={`absolute text-xs text-red-600 ${
                        fileError ? "visible" : "invisible"
                     }`}
                  >
                     {fileError ? "Please upload an image" : " "}
                  </p>
               </div>

               {/* Button to submit the form with those contents */}
               <SubmitButton title=" Create Post" />
            </div>
         </form>
      </div>
   );
}
