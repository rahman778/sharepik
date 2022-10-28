import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Amplify, Auth } from "aws-amplify";
import awsconfig from "../aws-exports";
import AuthProvider from "../context/AuthContext";

Amplify.configure({ ...awsconfig, ssr: true });

function MyApp({ Component, pageProps }: AppProps) {
   return (
      <AuthProvider>
         <Component {...pageProps} />
      </AuthProvider>
   );
}

export default MyApp;
