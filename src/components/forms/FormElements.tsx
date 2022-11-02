import React from "react";
interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
   labelText?: string;
   id: string;
   error?: boolean;
   type?: string;
   helperText?: string | null;
}

const Input = React.forwardRef<HTMLInputElement, IProps>(
   ({ labelText, id, error, helperText, type = "text", ...props }, ref) => {
      return (
         <>
            <div className="relative">
               <input
                  ref={ref}
                  className={`block border-2 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-sm ${
                     error
                        ? "border-rose-400 focus:border-rose-500"
                        : "border-gray-300/75 focus:border-cyan-500"
                  } appearance-none focus:outline-none focus:ring-0 peer`}
                  type={type}
                  placeholder=" "
                  id={id}
                  {...props}
               />
               <label
                  htmlFor={id}
                  className={`absolute text-sm ${
                     error
                        ? "text-red-500 peer-focus:text-red-500"
                        : "text-gray-500 peer-focus:text-gray-500"
                  } duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}
               >
                  {labelText}
               </label>
               <p className={`absolute text-xs text-red-600 ${error ? "visible" : "invisible"}`}>
                  {helperText || " "}
               </p>
            </div>
         </>
      );
   }
);

Input.displayName = "Input";

export default Input;
