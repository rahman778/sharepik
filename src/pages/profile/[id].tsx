import { useState } from "react";
import { withSSRContext } from "aws-amplify";
import { GetServerSideProps } from "next";

import { GetProfileQuery, Profile } from "../../API";
import Card from "../../components/Card";
import { getProfile } from "../../graphql/queries";
import getUserName from "../../utils/getUserName";

type PageProps = {
   profile: Profile;
};

const activeBtnStyles =
   "bg-teal-500 text-white font-semibold py-2 px-5 rounded-xl w-28 outline-none";
const notActiveBtnStyles =
   "bg-primary text-black font-semibold py-2 px-5 rounded w-28 outline-none";

function Profile({ profile }: PageProps) {
   const [activeBtn, setActiveBtn] = useState<string>("created");

   console.log("profile", profile);

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

                  <div className="capitalize bg-[#3E3D62] flex items-center justify-center text-5xl font-bold text-white rounded-full w-20 h-20 -mt-10 shadow-xl">
                     {getUserName(profile?.email)}
                  </div>
               </div>
               <h1 className="font-bold text-3xl text-center mt-3">{profile?.username}</h1>
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
            <div className="px-3 mx-auto mt-4">
               {activeBtn === "created" && (
                  <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4">
                     {profile.posts!.items.map((post) => (
                        <div className="w-full mb-4" key={post!.id}>
                           <Card post={post!} />
                        </div>
                     ))}
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}

export default Profile;

export const getServerSideProps: GetServerSideProps = async (context) => {
   const SSR = withSSRContext();

   console.log(context);

   const { id } = context.params!;

   const response = (await SSR.API.graphql({
      query: getProfile,
      variables: {
         id,
      },
   })) as {
      data: GetProfileQuery;
   };

   return {
      props: response.data.getProfile as Profile,
   };
};
