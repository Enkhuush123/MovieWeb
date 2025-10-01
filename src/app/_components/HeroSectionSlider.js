"use client";

import { useEffect, useState } from "react";
import { HeroSectionSlide } from "../_feature/HeroSection";
import { RightButton } from "../_Icons/RightIcon";
import { LeftArrow } from "../_Icons/LeftArrowIcon";
import { Watch } from "../_Icons/WatchIcon";

export const HeroSectionList = () => {
  const apiLink =
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
    },
  };

  const [headerMovie, setHeaderMovie] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const data = await fetch(apiLink, options);
    const jsonData = await data.json();
    setHeaderMovie(jsonData.results.slice(0, 5));
    setTimeout(() => {
      setLoading(false);
      {
        1000;
      }
    });

    console.log(jsonData, "haha");
  };

  useEffect(() => {
    getData();
  }, []);

  const prev = () => {
    setCurrentIndex((idx) => (idx > 0 ? idx - 1 : idx));
  };

  const next = () => {
    setCurrentIndex((idx) => (idx < headerMovie.length - 1 ? idx + 1 : idx));
  };

  if (loading) {
    return <div className=" w-full h-[700px] flex  bg-grey-100"></div>;
  }

  return (
    <div className=" relative h-[full] w-full overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {headerMovie.map((movie) => (
          <div
            className="w-[1440px] h-[700px] flex-shrink-0 relative"
            key={movie.id}
          >
            <HeroSectionSlide
              img={movie.backdrop_path}
              rate={movie.vote_average}
              title={movie.title}
              overview={movie.overview}
              onPrev={prev}
              onNext={next}
              movieId={movie.id}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-between px-10 z-20">
        <div>
          {currentIndex > 0 && (
            <button
              onClick={prev}
              className="w-10 h-10 bg-white rounded-full flex justify-center items-center cursor-pointer "
            >
              <LeftArrow />
            </button>
          )}
        </div>
        <div>
          <button className="  w-[145px] h-[40px] bg-white text-black rounded-lg flex items-center justify-center gap-2 hover:opacity-70 transition duration-300 cursor-pointer relative z-50  ">
            <Watch />
            Watch Trailer
          </button>
        </div>
        <div>
          {currentIndex < headerMovie.length - 1 && (
            <button
              onClick={next}
              className="w-10 h-10 bg-white rounded-full flex justify-center items-center cursor-pointer "
            >
              <RightButton />
            </button>
          )}
        </div>
      </div>
      {/* <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-50">
        {headerMovie.map((movie, idx) => (
          <button
            key={movie.id}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full ${
              idx === currentIndex ? "bg-white" : "bg-white/40"
            }`}
          ></button>
        ))}
      </div> */}
    </div>
  );
};
