"use client";

import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MovieCard } from "./MovieCard";
import Link from "next/link";

export const TopRatedMovieSlider = () => {
  const apiLink =
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
    },
  };

  const [upComingMovieList, setUpComingMovieList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showMovies, setShowMovies] = useState(10);

  const getData = async () => {
    setLoading(true);

    const data = await fetch(apiLink, options);
    const jsonData = await data.json();
    setUpComingMovieList(jsonData.results);
    setLoading(false);
  };
  console.log(upComingMovieList);

  useEffect(() => {
    getData();
  }, []);

  const showallmovies = () => {
    setShowMovies((prev) => prev + 10);
  };

  const showlessmovies = () => {
    setShowMovies((prev) => prev - 10);
  };
  return (
    <div className="flex gap-[52px] ">
      <div className="flex flex-col pl-[80px] pr-[80px] ">
        <div className="flex flex-row justify-between pt-[52px]">
          <h3 className="font-semibold text-2xl">Top Rated</h3>

          <div>
            <Link href="./topRatedMovies/">
              <p className="flex flex-row items-center gap-2 pr-[7px] cursor-pointer">
                See More
                <FaArrowRight className="w-[9px] h-[9px]" />
              </p>
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap gap-8">
          {upComingMovieList.slice(0, showMovies).map((movie, index) => {
            return (
              <MovieCard
                key={index}
                title={movie.title}
                img={movie.poster_path}
                rate={movie.vote_average}
                movieId={movie.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
