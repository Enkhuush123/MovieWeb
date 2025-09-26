"use client";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MovieCard } from "../_components/MovieCard";
import { useEffect, useState } from "react";

export const SeeUpcomingMovies = () => {
  const apiBase = "https://api.themoviedb.org/3/movie/upcoming?language=en-US";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
    },
  };
  const [SeeUpcomingMovies, setSeeUpcomingMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getData = async (page = 1) => {
    const data = await fetch(`${apiBase}&page=${page}`, options);
    const jsonData = await data.json();
    setTotalPages(jsonData.total_pages);
    setSeeUpcomingMovies(jsonData.results);
    setCurrentPage(page);
  };
  console.log(SeeUpcomingMovies, "haha");
  console.log(totalPages, "total");

  useEffect(() => {
    getData(1);
  }, []);

  const prevPage = () => {
    if (currentPage > 1) {
      getData(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage < totalPages) {
      getData(currentPage + 1);
    }
  };

  return (
    <div className="flex flex-col w-[1440px] m-auto gap-10">
      <div className="flex gap-[52px] pt-[52px] ">
        <div className="flex flex-col pl-[80px] pr-[80px] ">
          <div className="flex flex-row justify-between pt-[52px]">
            <h3 className="font-semibold text-2xl">Upcoming Movies</h3>
          </div>
          <div className="flex flex-wrap  gap-8">
            {SeeUpcomingMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                img={movie.backdrop_path}
                title={movie.title}
                rate={movie.vote_average}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-2 w-full h-10 items-end justify-end pr-[80px] ">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded flex items-center gap-1 cursor-pointer  ${
            currentPage === 1
              ? " cursor-not-allowed opacity-50"
              : " shadow-xs  "
          }`}
        >
          Prev
        </button>
        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => getData(page)}
              className={`px-3 py-1 rounded cursor-pointer ${
                currentPage === page ? "border border-[#ddd]" : " "
              }`}
            >
              {page}
            </button>
          )
        )}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded flex items-center gap-1 cursor-pointer ${
            currentPage === totalPages
              ? " cursor-not-allowed opacity-50"
              : "shadow-xs"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};
