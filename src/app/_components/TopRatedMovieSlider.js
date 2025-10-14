"use client";

import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MovieCard } from "./MovieCard";
import Link from "next/link";
import { Loading } from "./Loading";

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
    setTimeout(() => setLoading(false), 600);
  };
  console.log(upComingMovieList);

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex gap-[52px] max-sm:w-full ">
      <div className="flex flex-col pr-20 pl-20  max-sm:p-5 gap-10 ">
        <div className="flex flex-row justify-between ">
          <h3 className="font-semibold text-2xl">Top Rated</h3>

          <div>
            <Link href="./TopRatedMovies/">
              <p className="flex flex-row items-center  gap-2 pr-[7px] cursor-pointer">
                See More
                <FaArrowRight className="w-[9px] h-[9px]" />
              </p>
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap gap-8 justify-center">
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
