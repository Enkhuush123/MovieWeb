"use client";

export const Loading = () => {
  return (
    <div className="flex gap-[52px] max-sm:w-full ">
      <div className="flex flex-col pl-[80px] pr-[80px] gap-8 max-sm:p-5  max-sm:w-full">
        <div className="flex flex-row justify-between pt-[52px]">
          <div className="w-[250px] h-[32px] bg-gray-300 rounded-full max-sm:w-[170px]"></div>
        </div>
        <div className="flex flex-wrap gap-8  max-sm:w-full">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="w-[229.73px] h-[439px] bg-gray-300 rounded-lg max-sm:w-[45%] max-sm:h-[284px]   "
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
