"use client";

import { useRouter } from "next/navigation";
import { RightButton } from "../_Icons/RightIcon";

export const Genre = (props) => {
  const { name, genreId } = props;
  const userouter = useRouter();

  const handleGenreClick = () => {
    userouter.push(`/genre-detail/${genreId}`);
  };
  return (
    <button
      onClick={handleGenreClick}
      className=" h-[25px] p-2 flex items-center gap-2 border border-border justify-center rounded-full font-semibold text-xs cursor-pointer hover:bg-black hover:text-white "
    >
      {name} <RightButton />
    </button>
  );
};
