"use client";

export const MovieDetailLoading = () => {
  return (
    <div className="m-auto flex flex-col items-center max-sm:w-full ">
      <div className=" flex flex-col w-[1080px]  gap-6 max-sm:w-full">
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
          className="flex flex-row gap-8 w-[1080px] h-[428px] max-sm:flex-col max-sm:w-full  max-sm:h-auto
      "
        >
          <div className="w-[760px] h-[428px] relative bg-gray-300 rounded-lg max-sm:rounded-none max-sm:w-full max-sm:h-[291px]  "></div>
          <div className="w-[290px] h-[428px] bg-gray-300 rounded-lg max-sm:hidden "></div>
        </div>

        <div className="flex gap-5 flex-col max-sm:p-5 w-[1080px] max-sm:w-full">
          <div className="flex flex-col gap-3 max-sm:flex-row max-sm:w-full md:hidden">
            <div className="w-[100px] h-[150px] bg-gray-300 rounded-lg "></div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap gap-4 ">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-[76px] h-5 bg-gray-300 rounded-full"
                  ></div>
                ))}
              </div>
              <div className="w-[1080px] h-[22px] bg-gray-300 max-sm:w-full rounded"></div>
              <div className="w-[1080px] h-[22px] bg-gray-300 max-sm:w-full rounded"></div>
              <div className="w-[1080px] h-[22px] bg-gray-300 max-sm:w-full rounded"></div>
            </div>
          </div>
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
      <div className="flex gap-[52px] w-[1280px] max-sm:w-full ">
        <div className="gap-8 flex flex-col max-sm:w-full max-sm:p-5">
          <div className="flex flex-row justify-between pt-[52px]">
            <div className="w-[170px] h-8 bg-gray-300 rounded-full "></div>

            <div className="w-[130px] h-9 bg-gray-300 rounded-full"></div>
          </div>

          <div className="flex flex-col gap-5 max-sm:w-full">
            <div className="flex flex-wrap gap-8  max-sm:w-full">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[229.73px] h-[439px] bg-gray-300 rounded-lg max-sm:w-[45%] max-sm:h-[284px]   "
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
