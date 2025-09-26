import { Star } from "../_Icons/StarIcon";

export const MovieCard = (props) => {
  const { title, img, rate } = props;
  return (
    <div className="w-[229.73px]  flex flex-col   pt-[32px] rounded-lg ">
      <div className="w=full aspect-[2/3] overflow-hidden rounded-t-lg hover:opacity-[0.5]">
        <img
          className="w-full h-full object-cover  "
          src={`https://image.tmdb.org/t/p/original${img}`}
        ></img>
      </div>
      <div className="flex flex-col p-2 bg-[#F4F4F5] h-[96px] rounded-b-lg  gap-1  ">
        <div>
          <div className="flex gap-1 font-medium text-base items-center">
            <Star className="w-2 h-2" />{" "}
            <p>
              {rate}
              <span className="text-xs text-gray-500">/10</span>
            </p>
          </div>
        </div>

        <div className="font-normal text-lg flex flex-col">
          <p>{title}</p>
        </div>
      </div>
    </div>
  );
};
