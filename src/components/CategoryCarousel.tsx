import { Swiper, SwiperSlide } from "swiper/react";
import { categories } from "../utils/data";
import Category from "./Category";
import { CategorySkeleton } from "./Skeleton";

type Props = {
   onCategoryClick: (name: string) => void;
   loading?: boolean;
};

function CategoryCarousel({ onCategoryClick, loading }: Props) {
   return (
      <Swiper
         spaceBetween={10}
         slidesPerView={2.5}
         grabCursor={true}
         breakpoints={{
            640: {
               slidesPerView: 3.5,
            },
            768: {
               slidesPerView: 4.5,
            },
            1024: {
               slidesPerView: 6.5,
            },
            1280: {
               slidesPerView: 7.5,
            },
            1480: {
               slidesPerView: 9.5,
            },
         }}
      >
         {categories.slice(0, categories.length - 1).map((category) => (
            <SwiperSlide key={category.name}>
               {loading ? (
                  <CategorySkeleton />
               ) : (
                  <Category {...category} onCategoryClick={onCategoryClick} />
               )}
            </SwiperSlide>
         ))}
      </Swiper>
   );
}

export default CategoryCarousel;
