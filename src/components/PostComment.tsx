import React, { ReactElement } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Comment } from "../API";
import Avatar from "./Avatar";
import getUserName from "../utils/getUserName";

interface Props {
   comment: Comment;
}

dayjs.extend(relativeTime);

export default function PostComment({ comment }: Props): ReactElement {
   return (
      <>
         <div className="flex flex-row gap-4 mt-6 items-center">
            <Avatar
               name={getUserName(comment.by!.email)}
               classes="h-10 w-10 text-xl font-semibold"
            />
            <div className="flex flex-col">
               <div className="flex flex-row items-center">
                  <p className="font-bold mb-0">{getUserName(comment.by!.email)}</p>
                  <p className="text-sm text-gray-400 mb-0 ml-4">
                     {dayjs(comment.createdAt).fromNow()}
                  </p>
               </div>

               <p>{comment.content}</p>
            </div>
         </div>
         <hr className="mt-5" />
      </>
   );
}
