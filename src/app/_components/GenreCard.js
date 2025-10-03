"use client";

import { useRouter } from "next/navigation";
import { RightButton } from "../_Icons/RightIcon";

export const Genre = (props) => {
  const { name, genresId } = props;
  const userouter = useRouter();

  const handleGenreClick = () => {
    userouter.push(`/genre-detail/${genresId}`);
  };
  return (
    <button
      onClick={handleGenreClick}
      className=" h-[25px] p-2 flex items-center gap-2 border border-border justify-center rounded-full font-semibold text-xs cursor-pointer hover:bg-black hover:text-white hover:scale-120 "
    >
      {name} <RightButton />
    </button>
  );
};
