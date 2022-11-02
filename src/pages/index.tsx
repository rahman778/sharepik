import type { NextPage } from "next";
import Head from "next/head";
import { useAuth } from "../context/AuthContext";

const Home: NextPage = () => {
   const { user, setUser } = useAuth();
   console.log("user", user);
   return (
      <div>
         <Head>
            <title>Share Pic</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
         </Head>

         <main>
            <div className="h-80 bg-[#171544] bg-gradient-to-b from-[#171544] to-[#333072]"></div>
         </main>
      </div>
   );
};

export default Home;
