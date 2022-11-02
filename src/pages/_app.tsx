import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Amplify } from "aws-amplify";
import awsconfig from "../aws-exports";
import { ToastContainer } from "react-toastify";
import AuthProvider from "../context/AuthContext";
import Navbar from "../components/nav/Navbar";

Amplify.configure({ ...awsconfig, ssr: true });

function MyApp({ Component, pageProps }: AppProps) {
   return (
      <>
         <AuthProvider>
            <Navbar />
            <Component {...pageProps} />
         </AuthProvider>
         <ToastContainer />
      </>
   );
}

export default MyApp;
