import {
   createContext,
   Dispatch,
   ReactElement,
   SetStateAction,
   useContext,
   useEffect,
   useState,
} from "react";
import { Auth, Hub } from "aws-amplify";
import { CognitoUser } from "amazon-cognito-identity-js";

export interface ICognitoUser extends CognitoUser {
   [attributes: string]: any;
   username: string;
   userConfirmed?: boolean;
   keyPrefix?: string;
   userSub?: string;
}

interface IAuthContext {
   user: ICognitoUser | null;
   setUser: Dispatch<SetStateAction<ICognitoUser | null>>;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

interface Props {
   children: React.ReactElement;
}

export default function AuthProvider({ children }: Props): ReactElement {
   const [user, setUser] = useState<ICognitoUser | null>(null);

   useEffect(() => {
      checkUser();
   }, []);

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
