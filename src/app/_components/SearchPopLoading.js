"use client";

export const SearchPopLoading = () => {
  return (
    <div className=" flex flex-col gap-8">
      <div className="pl-20">
        <p className="font-semibold text-3xl">Search results</p>
      </div>
      <div className="w-[1440px] pr-20 pl-20 flex flex-row gap-8">
        <div className="flex flex-col gap-7">
          <div className="flex  flex-col">
            <div className="w-[199px] h-7 bg-gray-300"></div>
            <div className="flex flex-wrap gap-8">
              <div className="w-[229.73px] h-[439px] bg-gray-300 "></div>
              <div className="w-[229.73px] h-[439px] bg-gray-300 "></div>
              <div className="w-[229.73px] h-[439px] bg-gray-300 "></div>
              <div className="w-[229.73px] h-[439px] bg-gray-300 "></div>
              <div className="w-[229.73px] h-[439px] bg-gray-300 "></div>
              <div className="w-[229.73px] h-[439px] bg-gray-300 "></div>
              <div className="w-[229.73px] h-[439px] bg-gray-300 "></div>
              <div className="w-[229.73px] h-[439px] bg-gray-300 "></div>
              <div className="w-[229.73px] h-[439px] bg-gray-300 "></div>
            </div>
          </div>
          <div className="flex gap-2 w-full h-10 items-end justify-end pr-[80px] "></div>
        </div>
      </div>
    </div>
  );
};
