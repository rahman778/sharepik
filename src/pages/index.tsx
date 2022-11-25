import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { API } from "aws-amplify";
import { toast } from "react-toastify";

import CategoryCarousel from "../components/CategoryCarousel";
import Card from "../components/Card";
import SigninModal from "../components/modals/SigninModal";
import { useModal } from "../context/ModalContext";
import { ListPostsQuery, Post, SearchPostsQuery } from "../API";
import { listPosts, searchPosts } from "../graphql/queries";
import { CardSkeleton } from "../components/Skeleton";

const Home: NextPage = () => {
   const { showModal, setShowModal } = useModal();

   const [posts, setPosts] = useState<Post[]>([]);
   const [fetchingPosts, setFetchingPosts] = useState<boolean>(false);
   const [nextToken, setNextToken] = useState<string | null>(null);

   useEffect(() => {
      const fetchPosts = async (): Promise<Post[]> => {
         setFetchingPosts(true);
         const allPosts = (await API.graphql({ query: listPosts })) as {
            data: ListPostsQuery;
            errors: any[];
         };

         setFetchingPosts(false);

         if (allPosts.data) {
            setPosts(allPosts?.data?.listPosts?.items as Post[]);
            return allPosts?.data?.listPosts?.items as Post[];
         } else {
            toast.error("Could not get posts");
            throw new Error("Could not get posts");
         }
      };

      fetchPosts();
   }, []);

   console.log("posts", posts);

   const onCategoryClick = async (name: string): Promise<void> => {
      setFetchingPosts(true);
      const searchCategory = (await API.graphql({
         query: searchPosts,
         variables: {
            filter: { category: { matchPhrase: name } },
            limit: 20,
            nextToken: nextToken,
         },
      })) as { data: SearchPostsQuery };
      if (searchCategory.data) {
         setPosts(searchCategory?.data?.searchPosts?.items as Post[]);
         setNextToken(searchCategory?.data?.searchPosts?.nextToken as string);
      } else {
         toast.error("Could not get posts");
         throw new Error("Could not get posts");
      }
      setFetchingPosts(false);
   };

   return (
      <div className="mb-10">
         <Head>
            <title>Share Pic</title>
            <meta name="description" content="Image sharing app" />
            <link rel="icon" href="/favicon.ico" />
         </Head>

         <main>
            <div className="h-80 bg-[#171544] bg-gradient-to-b from-[#171544] to-[#333072]">
               <div className="pt-20">
                  <CategoryCarousel onCategoryClick={onCategoryClick} />
               </div>
            </div>

            <div className="px-3 mx-auto mt-4">
               {fetchingPosts ? (
                  <>
                     <div className="mb-4 columns-1 sm:columns-2 md:columns-3 lg:columns-4">
                        <CardSkeleton />
                        <CardSkeleton />
                        <CardSkeleton />
                        <CardSkeleton />
                     </div>
                  </>
               ) : (
                  <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4">
                     {posts.map((post) => (
                        <div className="w-full mb-4" key={post.id}>
                           <Card post={post} />
                        </div>
                     ))}
                  </div>
               )}
            </div>
         </main>
         {showModal && <SigninModal closeModal={() => setShowModal(false)} />}
      </div>
   );
};

export default Home;
