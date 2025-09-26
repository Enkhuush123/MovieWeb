"use client";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Star } from "../_Icons/StarIcon";
import { Watch } from "../_Icons/WatchIcon";
import { RightButton } from "../_Icons/RightIcon";

import { LeftArrow } from "../_Icons/LeftArrowIcon";

export const HeroSectionSlide = (props) => {
  const { img, title, overview, rate, onNext, onPrev, showPrev, showNext } =
    props;

  return (
    <div className="pt-6 w-full h-[700px] relative flex justify-between  ">
      <img
        src={`https://image.tmdb.org/t/p/original${img}`}
        className="w-full h-full absolute -z-10 object-cover inset-0"
      ></img>

      <div className="flex ">
        <div className="text-white flex flex-col gap-4 pt-[178px] pl-[140px] w-[650px] h-full ">
          <div>
            <div>
              <p>Now Playing:</p>
            </div>

            <div className="font-bold text-4xl">
              <h1>{title}</h1>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star /> {rate}
            <span className="text-xs text-gray-500">/10</span>
          </div>

          <div>
            <p className="text-[14px] ">{overview}</p>
          </div>

          <div>
            <button className="w-[145px] h-[40px] bg-white text-black rounded-lg flex items-center justify-center gap-2 hover:opacity-70 transition duration-300 cursor-pointer  ">
              <Watch />
              Watch Trailer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
