import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { categories } from "../utils/data";
import Category from "../components/Category";
import CategoryCarousel from "../components/CategoryCarousel";
import { useAuth } from "../context/AuthContext";
import Card from "../components/Card";

const Home: NextPage = () => {
   const { user, setUser } = useAuth();
   <style jsx>{`
      .masonry {
         column-count: 3;
         column-gap: 2rem;
      }
      @screen lg {
         .masonry {
            column-count: 4;
         }
      }
   `}</style>;
   return (
      <div>
         <Head>
            <title>Share Pic</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
         </Head>

         <main>
            <div className="h-80 bg-[#171544] bg-gradient-to-b from-[#171544] to-[#333072]">
               <div className="pt-20">
                  <CategoryCarousel />
               </div>
            </div>

            <div className="px-3 mx-auto mt-4">
               <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4">
                  {categories.slice(0, categories.length - 1).map((category) => (
                     <div className="w-full mb-4">
                        <Card img={category.image} />
                     </div>
                     //<img key={category.name} className="w-full mb-4" src={category.image} />
                  ))}
               </div>
            </div>
         </main>
      </div>
   );
};

export default Home;
