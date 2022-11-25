import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import SubmitButton from "../components/forms/SubmitButton";
import { useAuth } from "../context/AuthContext";

import authPic from "../../public/auth-img.jpg";
import logo from "../../public/logo.png";
import Image from "next/image";
import Input from "../components/forms/FormElements";

interface IFormInput {
   email: string;
   password: string;
}

type Props = {};

function Login({}: Props) {
   const router = useRouter();

   const [isLoading, setisLoading] = useState<boolean>(false);

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
         await Auth.signIn(data.email, data.password);
         router.push(`/`);
      } catch (e: any) {
         toast.error(e.message);
      }

      setisLoading(false);
   };

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
               Sign in to account
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

               <SubmitButton title="Log in" loading={isLoading} />
            </form>

            <h6 className="text-center text-neutral-700 mt-8 text-sm">
               Dont have an account?{" "}
               <Link href="/signup">
                  <a className="text-blue-700 font-semibold">Sign up</a>
               </Link>
            </h6>
         </div>
      </div>
   );
}

export default Login;
