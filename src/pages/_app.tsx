import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Amplify } from "aws-amplify";
import awsconfig from "../aws-exports";
import { ToastContainer } from "react-toastify";
import AuthProvider from "../context/AuthContext";
import Navbar from "../components/nav/Navbar";
import ModalProvider from "../context/ModalContext";
import { useRouter } from "next/router";

Amplify.configure({ ...awsconfig, ssr: true });

const hideNav = ["/login", "/signup"];

function MyApp({ Component, pageProps }: AppProps) {
   const router = useRouter();

   const showNav = hideNav.includes(router.pathname) ? false : true;

   return (
      <>
         <AuthProvider>
            <ModalProvider>
               <>{showNav && <Navbar />}</>
               <Component {...pageProps} />
            </ModalProvider>
         </AuthProvider>
         <ToastContainer />
      </>
   );
}

export default MyApp;
