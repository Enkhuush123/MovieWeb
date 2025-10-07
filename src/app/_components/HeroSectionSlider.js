"use client";

import { useEffect, useState } from "react";
import { HeroSectionSlide } from "../_feature/HeroSection";
import { RightButton } from "../_Icons/RightIcon";
import { LeftArrow } from "../_Icons/LeftArrowIcon";
import { Watch } from "../_Icons/WatchIcon";
import MovieDetail from "../movie-detail/[id]/page";
import { Star } from "../_Icons/StarIcon";
import { WatchWhite } from "../_Icons/WatchWhiteIcon";

export const HeroSectionList = ({ onWatch }) => {
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
  const [showTrailer, setShowTrailer] = useState(null);
  const currentMovie = headerMovie[currentIndex];
  console.log(currentMovie, "cureent  ");
  console.log(headerMovie);

  const getData = async () => {
    setLoading(true);
    const data = await fetch(apiLink, options);
    const jsonData = await data.json();
    setHeaderMovie(jsonData.results.slice(0, 5));
    setTimeout(() => setLoading(false), 600);

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
    return (
      <div className="w-full h-[700px] flex items-center justify-center bg-gray-200">
        <div className="w-[1440px] h-[700px] bg-gray-300 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="">
      <div className=" relative h-full w-full overflow-hidden max-sm:w-full ">
        <div
          className="flex transition-transform duration-700 ease-in-out   "
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {headerMovie.map((movie) => (
            <div
              className="w-[1440px] h-[700px] flex-shrink-0 relative max-sm:w-full max-sm:h-[246px]  "
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
                onWatch={(trailer) => setShowTrailer(trailer)}
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-between px-10 z-20 pointer-events-none max-sm:hidden">
          <div>
            {currentIndex > 0 && (
              <button
                onClick={prev}
                className="w-10 h-10 bg-white rounded-full flex justify-center items-center cursor-pointer pointer-events-auto "
              >
                <LeftArrow />
              </button>
            )}
          </div>

          <div>
            {currentIndex < headerMovie.length - 1 && (
              <button
                onClick={next}
                className="w-10 h-10 bg-white rounded-full flex justify-center items-center cursor-pointer pointer-events-auto "
              >
                <RightButton />
              </button>
            )}
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 max-sm:top-55 max-sm:w-full max-sm:justify-center ">
          {headerMovie.map((movie, idx) => (
            <button
              key={movie.id}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full ${
                idx === currentIndex
                  ? "bg-white"
                  : "bg-white/40 pointer-events-auto"
              }`}
            ></button>
          ))}
        </div>
        {showTrailer && (
          <div className="bg-black/90 fixed inset-0 bg-opacity-100 flex justify-center  items-center   ">
            <iframe
              width="1280"
              height="720"
              src={`https://www.youtube.com/embed/${showTrailer.key}`}
              title="title"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <h1
              onClick={() => setShowTrailer(false)}
              className="text-white cursor-pointer font-bold text-4xl absolute top-30 right-100 hover:scale-120"
            >
              X
            </h1>
          </div>
        )}
      </div>
      <div className="hidden max-sm:flex   gap-3 w-full text-black p-5  ">
        {currentMovie && (
          <div className="text-black flex flex-col gap-4  w-[650px] h-full ">
            <div className="flex justify-between">
              <div>
                <div>
                  <p className="text-black">Now Playing:</p>
                </div>
                <div className="font-bold text-4xl ">
                  <h1 className="text-black">{currentMovie.title}</h1>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star /> {currentMovie.vote_average}
                <span className="text-xs text-gray-500">/10</span>
              </div>
            </div>

            <div>
              <p className="text-[14px] ">{currentMovie.overview}</p>
            </div>

            <div>
              <button
                onClick={() => onWatch(trailer)}
                className=" w-[145px] h-[40px] bg-black text-white rounded-lg flex items-center justify-center gap-2 hover:opacity-70 transition duration-300 cursor-pointer relative  "
              >
                <WatchWhite />
                Watch Trailer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
