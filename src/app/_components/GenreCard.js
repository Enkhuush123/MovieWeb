import { RightButton } from "../_Icons/RightIcon";

export const Genre = (props) => {
  const { name } = props;
  return (
    <button className="w-[120px] h-[25px] flex items-center gap-2 border border-border justify-center rounded-full font-semibold text-xs cursor-pointer hover:bg-black hover:text-white ">
      {name} <RightButton />
    </button>
  );
};
