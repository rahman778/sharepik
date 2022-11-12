import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useModal } from "../../context/ModalContext";
import Input from "../forms/FormElements";
import SubmitButton from "../forms/SubmitButton";

interface IFormInput {
   email: string;
   password: string;
}

type Props = {
   closeModal: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
};

function SigninModal({ closeModal }: Props) {
   const [isLoading, setisLoading] = useState<boolean>(false);

   const { setShowModal } = useModal();

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<IFormInput>({
      mode: "onBlur",
   });

   const onSubmit: SubmitHandler<IFormInput> = async (data) => {
      setisLoading(true);
      try {
      } catch (e: any) {
         toast.error(e.message);
      }
      setisLoading(false);
   };

   return (
      <>
         <div
            className="w-full h-full fixed z-[90] left-0 top-0 bg-[#171544]/50"
            onClick={closeModal}
         ></div>
         <div
            id="authentication-modal"
            tabIndex={-1}
            aria-hidden="true"
            className="overflow-y-auto overflow-x-hidden flex items-center justify-center fixed top-0 right-0 left-0 z-[100] w-full h-screen"
         >
            <div className="relative p-4 w-full max-w-md h-auto">
               <div className="relative bg-white rounded-lg shadow">
                  <button
                     type="button"
                     className="absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                     data-modal-toggle="authentication-modal"
                     onClick={closeModal}
                  >
                     <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           fillRule="evenodd"
                           d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                           clipRule="evenodd"
                        ></path>
                     </svg>
                     <span className="sr-only">Close modal</span>
                  </button>
                  <div className="py-6 px-6 lg:p-10">
                     <h3 className="mb-8 text-xl font-medium text-gray-900">
                        Sign in to <span className="text-cyan-500 font-semibold">Sharepik</span>
                     </h3>
                     <form
                        className="space-y-6"
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
                                    value: 6,
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

                        <SubmitButton title="Login" loading={isLoading} />
                        <h6 className="text-center text-neutral-700 mt-8 text-sm">
                           Not registered?{" "}
                           <Link href="/signup" onClick={() => setShowModal(false)}>
                              <a className="text-blue-700 font-semibold hover:underline">
                                 Create account
                              </a>
                           </Link>
                        </h6>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}

export default SigninModal;
