import React, { ReactElement, useEffect, useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { API, withSSRContext, Storage } from "aws-amplify";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { ParsedUrlQuery } from "querystring";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import relativeTime from "dayjs/plugin/relativeTime";
import { toast } from "react-toastify";

import { listPosts, getPost, commentsByPost } from "../../graphql/queries";
import {
   ListPostsQuery,
   GetPostQuery,
   Post,
   CreateCommentInput,
   CreateCommentMutation,
   Comment,
   CommentsByPostQuery,
} from "../../API";
import PostComment from "../../components/PostComment";
import { createComment } from "../../graphql/mutations";
import { useAuth } from "../../context/AuthContext";
import Avatar from "../../components/Avatar";
import { MdDownloadForOffline } from "react-icons/md";
import ImagePreview from "../../components/ImagePreview";
import getUserName from "../../utils/getUserName";

interface IFormInput {
   comment: string;
}

interface Props {
   post: Post;
}

dayjs.extend(relativeTime);

export default function IndividualPost({ post }: Props): ReactElement {
   const { user } = useAuth();
   const router = useRouter();

   const { postId } = router.query;

   const [addingComment, setAddingComment] = useState(false);
   const [postImage, setPostImage] = useState<string | undefined>(undefined);
   const [comments, setComments] = useState<Comment[]>([]);
   const [loadingImage, setLoadingImage] = useState<boolean>(false);

   const {
      register,
      reset,
      formState,
      handleSubmit,
      formState: { isSubmitSuccessful },
   } = useForm<IFormInput>();

   useEffect(() => {
      if (formState.isSubmitSuccessful) {
         reset({ comment: "" });
      }
   }, [formState, reset]);

   useEffect(() => {
      const fetchComments = async () => {
         const allComments = (await API.graphql({
            query: commentsByPost,
            variables: {
               postId,
            },
         })) as {
            data: CommentsByPostQuery;
            errors: any[];
         };

         if (allComments.data) {
            setComments(allComments?.data?.commentsByPost?.items as Comment[]);
         } else {
            toast.error("Could not get comments");
            throw new Error("Could not get comments");
         }
      };

      fetchComments();
   }, [postId]);

   useEffect(() => {
      async function getImageFromStorage() {
         setLoadingImage(true);
         try {
            const signedURL = await Storage.get(post.image); // get key from Storage.list
            // @ts-ignore
            setPostImage(signedURL);
         } catch (error) {
            console.log("No image found.");
         }
         setLoadingImage(false);
      }

      getImageFromStorage();
   }, [post.image]);

   const onSubmit: SubmitHandler<IFormInput> = async (data) => {
      if (user) {
         setAddingComment(true);

         const newCommentInput: CreateCommentInput = {
            owner: user.username,
            content: data.comment,
            postId: post.id,
         };
         // Add Comment Mutation
         const createNewComment = (await API.graphql({
            query: createComment,
            variables: { input: newCommentInput },
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
         })) as { data: CreateCommentMutation };

         setComments([...comments, createNewComment.data.createComment as Comment]);

         setAddingComment(false);
      }
   };

   return (
      <div className="container mx-auto">
         <div className="flex flex-col lg:flex-row m-auto bg-white max-w-[1500px] mt-10 lg:gap-x-6">
            <div className="lg:w-4/6 lg:px-4">
               <ImagePreview image={postImage!} />
               <div>
                  {/* Start rendering comments */}
                  {user && (
                     <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="mt-10">
                        <div className="flex flex-wrap items-center mt-6 gap-4">
                           <Link href={`/profile${post.owner}`}>
                              <Avatar
                                 name={getUserName(post.author!.email)}
                                 classes="h-10 w-10 text-xl font-semibold"
                              />
                           </Link>
                           <input
                              className=" flex-1 border-gray-200 text-gray-700 outline-none border p-2 rounded-md focus:border-gray-300"
                              type="text"
                              placeholder="Add a comment"
                              id="comment"
                              {...register("comment", {
                                 required: { value: true, message: "Please enter." },
                                 maxLength: {
                                    value: 200,
                                    message: "Please enter a comment under 200 characters.",
                                 },
                              })}
                           />
                           <button
                              type="submit"
                              className="bg-teal-500 text-white rounded-md px-6 py-2 font-semibold text-base outline-none"
                              disabled={addingComment}
                           >
                              {addingComment ? "Doing..." : "Done"}
                           </button>
                        </div>
                     </form>
                  )}

                  {comments?.map((comment) => (
                     <PostComment key={comment.id} comment={comment} />
                  ))}
               </div>
            </div>
            <div className="h-full lg:min-h-[800px] lg:border-l mt-8 lg:mt-0 lg:w-2/6">
               <div className="lg:sticky lg:top-28 lg:h-auto lg:px-6">
                  <div className="flex-col items-start">
                     <div className="flex flex-row items-center">
                        <div>
                           <Avatar
                              name={getUserName(post.author!.email)}
                              classes="h-12 w-12 text-2xl font-semibold"
                           />
                        </div>
                        <div className="ml-6">
                           <div className="capitalize">{getUserName(post.author!.email)}</div>
                           <p className="mb-0 text-sm text-gray-400">
                              {dayjs(post.createdAt).fromNow()}
                           </p>
                        </div>
                     </div>

                     <h3 className="text-2xl mt-5 text-gray-700"> {post.title}</h3>
                     <p className="mt-4">{post.description}</p>
                  </div>
                  <button className="bg-teal-500  py-2 w-48 mt-5 rounded-md text-white font-semibold">
                     <a
                        href={postImage}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                           e.stopPropagation();
                        }}
                        className="flex items-center justify-center"
                     >
                        <MdDownloadForOffline color="#fff" fontSize={22} />
                        <span className="ml-3">Download</span>
                     </a>
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}

interface Params extends ParsedUrlQuery {
   postId: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
   const SSR = withSSRContext();

   const { postId } = context.params!;

   const postsQuery = (await SSR.API.graphql({
      query: getPost,
      variables: {
         id: postId,
      },
   })) as { data: GetPostQuery };

   return {
      props: {
         post: postsQuery.data.getPost as Post,
      },

      revalidate: 2,
   };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
   const SSR = withSSRContext();

   const response = (await SSR.API.graphql({ query: listPosts })) as {
      data: ListPostsQuery;
      errors: any[];
   };

   // Get the paths we want to pre-render based on posts
   const paths = response.data.listPosts!.items.map((post) => ({
      params: { postId: post!.id.toString() },
   }));

   return { paths, fallback: "blocking" };
};
