import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Auth } from "aws-amplify";
import { CognitoUser } from "@aws-amplify/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import Input from "../components/forms/FormElements";
import authPic from "../../public/auth-img.jpg";
import logo from "../../public/logo.png";
import Link from "next/link";
import SubmitButton from "../components/forms/SubmitButton";

interface IFormInput {
   email: string;
   password: string;
   code: string;
}

type Props = {};

function Signup({}: Props) {
   const router = useRouter();

   const [isLoading, setisLoading] = useState<boolean>(false);
   const [showCode, setShowCode] = useState<boolean>(false);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<IFormInput>({
      mode: "all",
   });

   const onSubmit: SubmitHandler<IFormInput> = async (data) => {
      setisLoading(true);
      try {
         if (showCode) {
            confirmSignUp(data);
         } else {
            await signUpWithEmailAndPassword(data);
            setShowCode(true);
         }
      } catch (e: any) {
         toast.error(e.message);
      }
      setisLoading(false);
   };

   async function signUpWithEmailAndPassword(data: IFormInput): Promise<CognitoUser> {
      const { password, email } = data;
      try {
         const { user } = await Auth.signUp({
            username: email,
            password,
            attributes: {
               email,
            },
         });

         if (user) {
            toast.success("A verification code has been sent to your email");
         }
         return user;
      } catch (error) {
         throw error;
      }
   }

   async function confirmSignUp(data: IFormInput) {
      const { email, password, code } = data;
      try {
         await Auth.confirmSignUp(email, code);
         const amplifyUser = await Auth.signIn(email, password);
         console.log("Successs, singed in a user", amplifyUser);
         if (amplifyUser) {
            router.push(`/`);
         } else {
            throw new Error("Something went wrong :'(");
         }
      } catch (error) {
         console.log("error confirming sign up", error);
      }
   }

   return (
      <div className="flex lg:flex-row h-screen items-center">
         <div className="hidden h-full lg:block lg:w-1/2">
            <div className="h-full w-full relative overflow-hidden">
               <Image src={authPic} alt="Picture of the author" layout="fill" objectFit="cover" />
            </div>
         </div>
         <div className="w-full lg:w-1/2 px-5 lg:px-10">
            <div className="mx-auto mb-6 w-40">
               <Link href="/">
                  <a>
                     <Image src={logo} alt="logo" layout="responsive" objectFit="contain" />
                  </a>
               </Link>
            </div>
            <h3 className="font-semibold text-neutral-700 text-2xl mb-8 text-center">
               Create an account
            </h3>
            <form
               className="w-full max-w-sm m-auto"
               onSubmit={handleSubmit(onSubmit)}
               autoComplete="off"
            >
               <div className="">
                  <Input
                     {...register("email", {
                        required: { value: true, message: "Please enter a valid email." },
                     })}
                     id="email"
                     labelText="Email"
                     error={errors.email ? true : false}
                     helperText={errors.email ? errors.email.message : null}
                  />
               </div>
               <div className="mt-6">
                  <Input
                     {...register("password", {
                        required: { value: true, message: "Please enter a password." },
                        minLength: {
                           value: 8,
                           message: "Please enter a stronger password.",
                        },
                     })}
                     id="password"
                     labelText="Password"
                     type="password"
                     error={errors.password ? true : false}
                     helperText={errors.password ? errors.password.message : null}
                  />
               </div>
               {showCode && (
                  <div className="mt-6">
                     <Input
                        {...register("code", {
                           required: { value: true, message: "Please enter a code." },
                           minLength: {
                              value: 6,
                              message: "Your verification is 6 characters long.",
                           },
                           maxLength: {
                              value: 6,
                              message: "Your verification is 6 characters long.",
                           },
                        })}
                        labelText="Code"
                        id="code"
                        error={errors.code ? true : false}
                        helperText={errors.code ? errors.code.message : null}
                     />
                  </div>
               )}

               <SubmitButton title={showCode ? "Confirm Code" : "Sign Up"} loading={isLoading} />
            </form>

            <h6 className="text-center text-neutral-700 mt-8 text-sm">
               Already have an account?{" "}
               <Link href="">
                  <a className="text-blue-700 font-semibold">Log in</a>
               </Link>
            </h6>
         </div>
      </div>
   );
}

export default Signup;
