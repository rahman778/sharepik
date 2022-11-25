import React from "react";
import Skeleton from "react-loading-skeleton";

type CarouselProps = {};

export function CategorySkeleton({}: CarouselProps) {
   return (
      <div className="w-[170px] ml-6">
         <div className="w-[120px] h-[125px] my-0 mx-auto rounded-full">
            <div className="rounded-full overflow-hidden">
               <Skeleton
                  height={120}
                  width={120}
                  circle
                  highlightColor="#ccc"
                  baseColor="#e0e0e0"
               />
            </div>
         </div>
      </div>
   );
}

type CardlProps = {
   count?: number;
};

export function CardSkeleton({ count }: CardlProps) {
   return (
      <div className="bg-white w-100 h-96 mb-4">
         <Skeleton height="100%" width="100%" count={count} className="mb-4" />
      </div>
   );
}
