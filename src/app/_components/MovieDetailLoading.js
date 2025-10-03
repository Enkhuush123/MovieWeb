"use client";

export const MovieDetailLoading = () => {
  return (
    <div className="m-auto flex flex-col items-center ">
      <div className=" flex flex-col w-[1080px]  gap-6">
        <div className="flex justify-between">
          <div className="flex flex-col gap-1 ">
            <div className="w-[211px] h-[40px] bg-gray-300 rounded-full"></div>
            <div className="flex flex-row gap-3 w-[237px] h-[28px] bg-gray-300 rounded-full"></div>
          </div>
          <div className="pr-3 flex flex-col gap-1">
            <div>
              <p className="font-medium text-xs">Rating:</p>
            </div>
            <div className="flex gap-[4px] items-center w-[83px] h-[20px] bg-gray-300 rounded-full "></div>
            <div className="text-xs text-gray-500 items-center bg-gray-300 w-[83px] h-4 rounded-full"></div>
          </div>
        </div>
        <div
          className="flex flex-row gap-8 w-[1080px] h-[428px]
      "
        >
          <div className="w-[290px] h-[428px] bg-gray-300 rounded-lg "></div>

          <div className="w-[760px] h-[428px] relative bg-gray-300 rounded-lg "></div>
        </div>

        <div className="flex gap-5 flex-col">
          <div className="flex flex-row gap-3">
            <div className="w-[77px] h-[20px] bg-gray-300 rounded-full "></div>
          </div>
          <div className="w-[1080px] h-[22px] bg-gray-300"></div>
          <div className="flex gap-12 font-bold text-base">
            <div className="w-[64px] h-7 bg-gray-300 rounded-full"></div>
            <div className="w-[137px] h-7 bg-gray-300 rounded-full"></div>
          </div>
          <div className="flex gap-12 font-bold text-base">
            <div className="w-[64px] h-7 bg-gray-300 rounded-full"></div>
            <div className="w-[360px] h-7 bg-gray-300 rounded-full"></div>
          </div>
          <div className="flex gap-12 font-bold text-base">
            <div className="w-[64px] h-7 bg-gray-300 rounded-full"></div>
            <div className="w-[355px] h-7 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
      <div className="flex gap-[52px] w-[1280px] ">
        <div className="gap-8 flex flex-col">
          <div className="flex flex-row justify-between pt-[52px]">
            <div className="w-[250px] h-8 bg-gray-300 rounded-full "></div>

            <div className="w-[165px] h-9 bg-gray-300 rounded-full"></div>
          </div>

          <div className="flex flex-wrap gap-8">
            <div className="w-[229.73px] h-[439px] bg-gray-300 rounded-lg"></div>
            <div className="w-[229.73px] h-[439px] bg-gray-300 rounded-lg"></div>
            <div className="w-[229.73px] h-[439px] bg-gray-300 rounded-lg"></div>
            <div className="w-[229.73px] h-[439px] bg-gray-300 rounded-lg"></div>
            <div className="w-[229.73px] h-[439px] bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
