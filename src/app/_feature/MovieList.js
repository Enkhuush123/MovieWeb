"use client";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Star } from "../_Icons/StarIcon";

export const MovieList = () => {
  return (
    <div className=" flex">
      <div className="flex gap-[52px] ">
        <div className="flex flex-col pl-[80px] pr-[80px] ">
          <div className="flex flex-row justify-around pt-[52px]">
            <h3 className="font-semibold text-2xl">Upcoming</h3>
            <button className="flex flex-row items-center gap-2">
              See more <FaArrowRight className="w-[9px] h-[9px]" />
            </button>
          </div>
          <div className="flex flex-wrap gap-8">
            <div className="w-[229.73px]  flex flex-col   pt-[32px] rounded-lg">
              <div>
                <img className="w-full  " src="/Dragon.jpg  "></img>
              </div>
              <div className="flex flex-col p-2 bg-[#F4F4F5] h-[96px]  gap-1  ">
                <div>
                  <div className="flex gap-1">
                    <Star /> <p>/10</p>
                  </div>
                </div>

                <div className="font-normal text-lg flex flex-col">
                  <p>Dear Santa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
