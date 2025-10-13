"use client";

export const SearchPopLoading = () => {
  return (
    <div className=" flex flex-col gap-8 m-auto max-sm:w-full">
      <div className="ml-20 max-sm:ml-2 w-[150px] h-9 bg-gray-300 rounded-full dark:bg-[#27272A] "></div>
      <div className="w-[1440px] pr-20 pl-20 flex flex-row gap-8 max-sm:w-full max-sm:p-5 max-sm:flex-col">
        <div className="flex flex-col gap-7 max-sm:w-full">
          <div className="w-[200px] h-9 bg-gray-300 rounded-full dark:bg-[#27272A]"></div>
          <div className="flex  flex-col max-sm:w-full ">
            <div className="max-sm:w-full w-[200px] bg-gray-300 dark:bg-[#27272A]"></div>
            <div className="flex flex-wrap gap-8 max-sm:w-full">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[229.73px] h-[439px] bg-gray-300 rounded-lg max-sm:w-[45%] dark:bg-[#27272A] max-sm:h-[284px]   "
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-b border-gray-300 dark:bg-[#27272A]"></div>
        <div className="flex flex-col gap-5 ">
          <div className="flex gap-5 ">
            <div className=" w-[387px] flex flex-col flex-wrap  gap-5  rounded-lg  ">
              <div className="flex flex-col gap-2">
                <div className="w-[200px] h-5 bg-gray-300 rounded-full dark:bg-[#27272A]"></div>
                <div className="w-[250px] h-9 bg-gray-300 rounded-full dark:bg-[#27272A]"></div>
              </div>

              <div className="flex flex-wrap gap-4  ">
                {Array.from({ length: 18 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-[76px] h-5 bg-gray-300 rounded-full dark:bg-[#27272A]"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
