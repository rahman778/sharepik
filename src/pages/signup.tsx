import { useForm, SubmitHandler } from "react-hook-form";
import { Auth } from "aws-amplify";
import { useAuth } from "../context/AuthContext";

interface IFormInput {
   username: string;
   email: string;
   password: string;
}

type Props = {};

function Signup({}: Props) {
   const { user, setUser } = useAuth();
   const { register, handleSubmit } = useForm<IFormInput>();
   const onSubmit: SubmitHandler<IFormInput> = async (data) => {
      const { username, email, password } = data;
      console.log(data);
      try {
         const { user } = await Auth.signUp({
            username,
            password,
            attributes: {
               email, // optional
               // other custom attributes
            },
            autoSignIn: {
               // optional - enables auto sign in after user is confirmed
               enabled: true,
            },
         });
         console.log(user);
      } catch (error) {
         console.log("error signing up:", error);
      }
   };

   return (
      <form
         className="bg-white border-x-slate-200 py-10"
         onSubmit={handleSubmit(onSubmit)}
         autoComplete="off"
      >
         <label>Username</label>
         <input
            {...register("username", {
               required: { value: true, message: "Please enter a valid username." },
            })}
            className="bg-slate-400"
         />
         <label>Email</label>
         <input
            {...register("email", {
               required: { value: true, message: "Please enter a valid email." },
            })}
            className="bg-slate-400"
         />
         <label>Password</label>
         <input
            {...register("password", {
               required: { value: true, message: "Please enter a password." },
               minLength: {
                  value: 6,
                  message: "Please enter a stronger password.",
               },
            })}
            className="bg-slate-400"
         />
         <input type="submit" className="bg-slate-400 ml-10" />
      </form>
   );
}

export default Signup;
