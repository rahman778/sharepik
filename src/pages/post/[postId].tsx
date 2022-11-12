import React, { ReactElement, useEffect } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { API, withSSRContext } from "aws-amplify";
import { listPosts, getPost } from "../../graphql/queries";
import {
   ListPostsQuery,
   GetPostQuery,
   Post,
   CreateCommentInput,
   CreateCommentMutation,
   Comment,
} from "../../API";
import PostPreview from "../../components/PostPreview";
import PostComment from "../../components/PostComment";
import { useForm, SubmitHandler } from "react-hook-form";
import { createComment } from "../../graphql/mutations";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import Avatar from "../../components/Avatar";
import Image from "next/image";
import formatDate from "../../lib/formatDate";
import { useRouter } from "next/router";
import { MdDownloadForOffline } from "react-icons/md";

interface IFormInput {
   comment: string;
}

interface Props {
   post: Post;
}

const post = {
   id: "1",
   comments: {
      items: [{ id: "2", owner: "ee", content: "www", createdAt: "" }],
   },
   description: "lorem ipsum dollar emmit",
   title: "weweww",
   image: "https://i.pinimg.com/750x/eb/47/44/eb4744eaa3b3ccd89749fa3470e2b0de.jpg",
   createdAt: "1667738575",
   owner: "fdgdgd",
};

export default function IndividualPost({}: Props): ReactElement {
   const [comment, setComment] = useState("");
   const [addingComment, setAddingComment] = useState(false);
   const [comments, setComments] = useState<Comment[]>(post.comments.items as Comment[]);
   console.log("comments", comments);

   const { user } = useAuth();
   const router = useRouter();

   useEffect(() => {
      setComments([
         { id: "2", owner: "ee", content: "www", createdAt: "1667738575" },
         { id: "3", owner: "ee", content: "www", createdAt: "1667738575" },
         { id: "4", owner: "ee", content: "www", createdAt: "1667738575" },
      ]);
   }, []);

   const {
      register,
      formState: { errors },
      handleSubmit,
   } = useForm<IFormInput>();

   const onSubmit: SubmitHandler<IFormInput> = async (data) => {
      console.log(data);
      setAddingComment(true);

      const newCommentInput: CreateCommentInput = {
         postCommentsId: post.id,
         content: data.comment,
      };
      // Add Comment Mutation
      const createNewComment = (await API.graphql({
         query: createComment,
         variables: { input: newCommentInput },
         authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as { data: CreateCommentMutation };

      setComments([...comments, createNewComment.data.createComment as Comment]);

      setAddingComment(false);
   };

   console.log("Got post:", post);

   return (
      <div className="container mx-auto">
         <div className="flex flex-col lg:flex-row m-auto bg-white max-w-[1500px] mt-10 lg:gap-x-6">
            <div className="lg:w-4/6 lg:px-4">
               <div className="flex justify-center items-center md:items-start flex-initial">
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
               <div>
                  {/* Start rendering comments */}
                  <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="mt-10">
                     <div className="flex flex-wrap items-center mt-6 gap-4">
                        <Link href={`/profile`}>
                           <Avatar name="AR" classes="h-10 w-10 text-xl font-semibold" />
                        </Link>
                        <input
                           className=" flex-1 border-gray-200 text-gray-700 outline-none border p-2 rounded-md focus:border-gray-300"
                           type="text"
                           placeholder="Add a comment"
                           value={comment}
                           onChange={(e) => setComment(e.target.value)}
                        />
                        <button
                           type="submit"
                           className="bg-teal-500 text-white rounded-md px-6 py-2 font-semibold text-base outline-none"
                        >
                           {addingComment ? "Doing..." : "Done"}
                        </button>
                     </div>
                  </form>

                  {comments.map((comment) => (
                     <PostComment key={comment.id} comment={comment} />
                  ))}
               </div>
            </div>
            <div className="h-full lg:min-h-[800px] lg:border-l mt-8 lg:mt-0">
               <div className="lg:sticky lg:top-28 lg:h-auto lg:px-6">
                  <div className="flex-col items-start">
                     <div className="flex flex-row items-center">
                        <div>
                           <Avatar name="sfsf" classes="h-12 w-12 text-2xl font-semibold" />
                        </div>
                        <div className="ml-6">
                           <div>{post.owner}</div>
                           <p className="mb-0 text-sm text-gray-400">
                              {formatDate(post.createdAt)}
                           </p>
                        </div>
                     </div>

                     <h3 className="text-2xl mt-5 text-gray-700"> {post.title}</h3>
                     <p>{post.description}</p>
                  </div>
                  <button className="bg-teal-500 flex items-center justify-center py-2 w-48 mt-5 rounded-md text-white font-semibold">
                     <MdDownloadForOffline color="#fff" fontSize={22} />
                     <span className="ml-3">Download</span>
                  </button>
               </div>
            </div>
         </div>

         {/* <PostPreview post={post} /> */}
      </div>
   );
}

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const SSR = withSSRContext();

//   const postsQuery = (await SSR.API.graphql({
//     query: getPost,
//     variables: {
//       id: params.id,
//     },
//   })) as { data: GetPostQuery };

//   return {
//     props: {
//       post: postsQuery.data.getPost as Post,
//     },

//     revalidate: 1,
//   };
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   const SSR = withSSRContext();

//   const response = (await SSR.API.graphql({ query: listPosts })) as {
//     data: ListPostsQuery;
//     errors: any[];
//   };

//   const paths = response.data.listPosts.items.map((post) => ({
//     params: { id: post.id },
//   }));

//   return { paths, fallback: "blocking" };
// };
