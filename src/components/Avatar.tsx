type Props = {
   name: string;
   classes?: string;
};

const defaulClasses = "h-20 w-20 text-5xl font-bold";

function Avatar({ name, classes = defaulClasses }: Props) {
   return (
      <div
         className={`capitalize bg-[#3E3D62] flex items-center justify-center text-white rounded-full ${classes} shadow-xl`}
      >
         {name.charAt(0)}
      </div>
   );
}

export default Avatar;
