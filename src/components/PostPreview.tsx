import React, { ReactElement, useState, useEffect } from "react";
import { Post } from "../API";
import formatDate from "../lib/formatDate";
import Image from "next/image";
import { useRouter } from "next/router";
import { API, Auth, Storage } from "aws-amplify";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { useAuth } from "../context/AuthContext";

interface Props {
   post: Post;
}

export default function PostPreview({ post }: Props): ReactElement {
   const router = useRouter();
   const { user } = useAuth();
   const [postImage, setPostImage] = useState<string | undefined>(undefined);

   // useEffect(() => {
   //   if (user) {
   //     const tryFindVote = post.votes.items?.find(
   //       (v) => v.owner === user.getUsername()
   //     );

   //     if (tryFindVote) {
   //       setExistingVote(tryFindVote.vote);
   //       setExistingVoteId(tryFindVote.id);
   //     }
   //   }
   // }, [user]);

   //    useEffect(() => {
   //       async function getImageFromStorage() {
   //          try {
   //             const signedURL = await Storage.get(post.image); // get key from Storage.list
   //             console.log("Found Image:", signedURL);
   //             // @ts-ignore
   //             setPostImage(signedURL);
   //          } catch (error) {
   //             console.log("No image found.");
   //          }
   //       }

   //       getImageFromStorage();
   //    }, []);

   console.log(post);

   return (
      <div className="flex flex-col lg:flex-row m-auto bg-white max-w-[1500px] mt-10 lg:gap-x-6">
         <div className="flex justify-center items-center md:items-start flex-initial lg:w-2/3">
            {/* {post.image && postImage && (
                        <div>
                           <Image
                              src={postImage}
                              height={540}
                              width={980}
                              layout="intrinsic"
                              alt="preview"
                           />
                        </div>
                     )} */}

            {post.image && (
               <div className="relative w-full h-96">
                  <Image src={post.image} layout="fill" objectFit="contain" alt="preview" />
               </div>
            )}
         </div>
         <div className="h-full lg:min-h-[800px] border-l">
            <div className="lg:sticky lg:top-28 lg:h-auto">
               <div className="flex-col items-start">
                  <h6>
                     Posted by <b>{post.owner}</b> {formatDate(post.createdAt)} hours ago
                  </h6>

                  <h5> {post.title}</h5>
                  <div className="">
                     <p>{post.description}</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
