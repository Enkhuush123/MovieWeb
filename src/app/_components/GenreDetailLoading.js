"use client";

import { Genre } from "./GenreCard";

export const GenreLoading = () => {
  return (
    <div className="flex flex-col gap-8 w-[1280px] max-sm:w-full m-auto">
      <div className="ml-25 max-sm:ml-5 w-[150px] h-9 bg-gray-300 rounded-full "></div>
      <div className="w-[1440px] pr-20 pl-20 flex flex-row gap-8 max-sm:flex-col max-sm:w-full max-sm:p-5 max-sm:justify-center max-sm:items-center ">
        <div className="flex flex-col gap-5">
          <div className="w-[387px] flex flex-col flex-wrap gap-5 rounded-lg max-sm:w-full">
            <div className="flex flex-col gap-2">
              <div className="w-[150px] h-9 bg-gray-300 rounded-full"></div>
              <div className="w-[250px] h-9 bg-gray-300 rounded-full"></div>
            </div>
            <div className="flex flex-wrap gap-4">
              {Array.from({ length: 18 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[76px] h-5 bg-gray-300 rounded-full"
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-r h-auto"></div>
        <div className="flex flex-col gap-5 max-sm:w-full">
          <div className="w-[200px] h-5 bg-gray-300 rounded-full"></div>
          <div className="flex flex-wrap gap-8 w-[800px] max-sm:w-full">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="w-[229.73px] h-[439px] bg-gray-300 rounded-lg max-sm:w-[45%] max-sm:h-[284px]   "
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
