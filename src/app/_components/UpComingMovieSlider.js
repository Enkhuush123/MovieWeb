"use client";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MovieCard } from "./MovieCard";
import { useEffect, useState } from "react";

import Link from "next/link";
import { Loading } from "./Loading";

export const UpComingMovieSlide = () => {
  const apiLink =
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";

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
    <div className="flex gap-[52px] m-auto max-sm:w-full   ">
      <div className="flex flex-col pr-20 pl-20  m-auto max-sm:p-5 ">
        <div className="flex flex-row justify-between  ">
          <h3 className="font-semibold text-2xl">Upcoming</h3>
          <div>
            <Link href="./UpComing">
              <p className="flex flex-row items-center gap-2 pr-[7px] cursor-pointer">
                See More
                <FaArrowRight className="w-[9px] h-[9px]" />
              </p>
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap gap-[32px] items-center justify-center ">
          {upComingMovieList.slice(0, 10).map((movie) => {
            return (
              <MovieCard
                key={movie.id}
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
