import {
   createContext,
   Dispatch,
   ReactElement,
   SetStateAction,
   useContext,
   useEffect,
   useState,
} from "react";
import { CognitoUser } from "@aws-amplify/auth";
import { Auth, Hub } from "aws-amplify";

interface IAuthContext {
   user: CognitoUser | null;
   setUser: Dispatch<SetStateAction<CognitoUser | null>>;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

interface Props {
   children: React.ReactElement;
}

export default function AuthProvider({ children }: Props): ReactElement {
   const [user, setUser] = useState<CognitoUser | null>(null);

   // useEffect(() => {
   //    checkUser();
   // }, []);

   useEffect(() => {
      Hub.listen("auth", () => {
         // perform some action to update state whenever an auth event is detected.
         checkUser();
      });
   }, []);

   async function checkUser() {
      try {
         const amplifyUser = await Auth.currentAuthenticatedUser();
         setUser(amplifyUser);
      } catch (error) {
         // No current signed in user.
         console.error(error);
         setUser(null);
      }
   }

   return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}

export const useAuth = (): IAuthContext => useContext(AuthContext);
