import { useState } from "react";
import { withSSRContext } from "aws-amplify";
import { GetServerSideProps } from "next";

import { GetProfileQuery, Post, PostsByProfileQuery, Profile } from "../../API";
import Card from "../../components/Card";
import { getProfile, postsByProfile } from "../../graphql/queries";
import getUserName from "../../utils/getUserName";
import Avatar from "../../components/Avatar";

type PageProps = {
   profile: Profile;
   posts: PostsByProfileQuery;
};

const activeBtnStyles =
   "bg-teal-500 text-white font-semibold py-2 px-5 rounded-xl w-28 outline-none";
const notActiveBtnStyles =
   "bg-primary text-black font-semibold py-2 px-5 rounded w-28 outline-none";

function Profile({ profile, posts }: PageProps) {
   const [activeBtn, setActiveBtn] = useState<string>("created");

   return (
      <div className="relative pb-2 h-full justify-center items-center">
         <div className="flex flex-col pb-5">
            <div className="relative flex flex-col mb-5">
               <div className="flex flex-col justify-center items-center">
                  <img
                     className=" w-full h-44 xl:h-64 shadow-lg object-cover"
                     src="https://source.unsplash.com/1600x900/?nature,photography,technology"
                     alt="user-pic"
                  />

                  <div className="capitalize -mt-10 rounded-full shadow-xl">
                     <Avatar
                        name={getUserName(profile?.email)}
                        classes="w-20 h-20 text-5xl font-bold"
                     />
                  </div>
               </div>
               <h1 className="font-bold text-3xl text-center mt-3">
                  {getUserName(profile?.email)}
               </h1>
            </div>
            <div className="flex justify-center space-x-2">
               <button
                  type="button"
                  onClick={(e) => {
                     setActiveBtn("created");
                  }}
                  className={`${activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles}`}
               >
                  Created
               </button>
               <button
                  type="button"
                  onClick={(e) => {
                     setActiveBtn("saved");
                  }}
                  className={`${activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles}`}
               >
                  Saved
               </button>
            </div>
         </div>
         <div className="px-3 mx-auto my-10">
            {activeBtn === "created" && (
               <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4">
                  {posts.postsByProfile!.items.map((post) => (
                     <div className="w-full mb-4" key={post!.id}>
                        <Card post={post as Post} />
                     </div>
                  ))}
               </div>
            )}
         </div>
      </div>
   );
}

export default Profile;

export const getServerSideProps: GetServerSideProps = async (context) => {
   const SSR = withSSRContext();

   const { id } = context.params!;

   const response = (await SSR.API.graphql({
      query: getProfile,
      variables: {
         id,
      },
   })) as {
      data: GetProfileQuery;
   };

   const postResponse = (await SSR.API.graphql({
      query: postsByProfile,
      variables: {
         owner: id,
      },
   })) as {
      data: PostsByProfileQuery;
   };

   return {
      props: {
         profile: response.data.getProfile as Profile,
         posts: postResponse.data as PostsByProfileQuery,
      },
   };
};
