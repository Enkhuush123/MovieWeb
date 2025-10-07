"use client";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Star } from "../_Icons/StarIcon";
import { Watch } from "../_Icons/WatchIcon";
import { RightButton } from "../_Icons/RightIcon";

import { LeftArrow } from "../_Icons/LeftArrowIcon";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const HeroSectionSlide = (props) => {
  const [trailer, setTrailer] = useState([]);

  // const params = useParams();

  // const { id } = params;

  const { img, title, overview, rate, movieId, onWatch } = props;
  const apiTrailer = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;

  const getData = async () => {
    const data = await fetch(apiTrailer, options);
    const jsonData = await data.json();
    const Trailer =
      jsonData.results.find(
        (trail) => trail.type === "Trailer" && trail.site === "YouTube"
      ) ||
      jsonData.results.find(
        (trail) => trail.type === "Teaser" && trail.site === "YouTube"
      );
    setTrailer(Trailer);
    console.log(jsonData, "Trailer");
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="max-sm:w-full max-sm:flex max-sm:flex-col max-sm:items-center">
      <div className="relative w-full h-[700px]  max-sm:w-full max-sm:h-full">
        <img
          src={`https://image.tmdb.org/t/p/original${img}`}
          className="w-full max-sm:w-full h-full max-sm:h-[246px]  object-cover max-sm:relative"
        ></img>
      </div>
      <div className="text-white flex-col gap-4 pt-[178px] pl-[140px] w-[650px] h-full absolute inset-0 hidden md:flex  ">
        <div>
          <div>
            <p>Now Playing:</p>
          </div>

          <div className="font-bold text-4xl">
            <h1>{title}</h1>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Star /> {rate}
          <span className="text-xs text-gray-500">/10</span>
        </div>

        <div>
          <p className="text-[14px] ">{overview}</p>
        </div>

        <div>
          <button
            onClick={() => onWatch(trailer)}
            className=" w-[145px] h-[40px] bg-white text-black rounded-lg flex items-center justify-center gap-2 hover:opacity-70 transition duration-300 cursor-pointer relative  "
          >
            <Watch />
            Watch Trailer
          </button>
        </div>
      </div>
    </div>
  );
};
