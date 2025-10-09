"use client";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MovieCard } from "../_components/MovieCard";
import { useEffect, useState } from "react";
import { LeftArrow } from "../_Icons/LeftArrowIcon";
import { RightButton } from "../_Icons/RightIcon";
import { Loading } from "../_components/Loading";

export const SeeMoreTopRated = () => {
  const apiBase = "https://api.themoviedb.org/3/movie/top_rated?language=en-US";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
    },
  };
  const [SeeMoreTopRatedMovies, setSeeMoreTopRatedMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const getData = async (page = 1) => {
    setLoading(true);
    const data = await fetch(`${apiBase}&page=${page}`, options);
    const jsonData = await data.json();
    setTotalPages(Math.min(jsonData.total_pages, 50));
    setSeeMoreTopRatedMovies(jsonData.results);
    setCurrentPage(page);
    setTimeout(() => setLoading(false), 600);
  };
  console.log(SeeMoreTopRated, "haha");

  useEffect(() => {
    getData(1);
  }, []);

  const getPagination = () => {
    const pages = [];
    const maxButtons = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxButtons - 1);

    if (end - start < maxButtons - 1) {
      start = Math.max(1, end - maxButtons + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col w-[1440px] m-auto gap-10 max-sm:w-full">
      <div className="flex gap-[52px] pt-[52px] max-sm:p-0 ">
        <div className="flex flex-col pl-[80px] pr-[80px] max-sm:p-5 ">
          <div className="flex flex-row justify-between pt-[52px]">
            <h3 className="font-semibold text-2xl">Top Rated Movies</h3>
          </div>
          <div className="flex flex-wrap  gap-8">
            {SeeMoreTopRatedMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                img={movie.poster_path}
                title={movie.title}
                rate={movie.vote_average}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-2 w-full h-10 items-end justify-end pr-[80px] max-sm:justify-center  max-sm:gap-0 max-sm:p-0 ">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded flex items-center gap-5 cursor-pointer  max-sm:gap-2  ${
            currentPage === 1
              ? " cursor-not-allowed opacity-50"
              : " shadow-xs  "
          }`}
        >
          <LeftArrow /> Prev
        </button>
        {getPagination().map((page, idx) =>
          page === "..." ? (
            <span key={idx} className="px-2 py-1">
              ...
            </span>
          ) : (
            <button
              key={idx}
              onClick={() => getData(page)}
              className={`px-3 py-1 rounded cursor-pointer ${
                currentPage === page ? "border border-[#ddd]" : ""
              }`}
            >
              {page}
            </button>
          )
        )}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded flex items-center gap-5 cursor-pointer max-sm:gap-2 ${
            currentPage === totalPages
              ? " cursor-not-allowed opacity-50"
              : "shadow-xs"
          }`}
        >
          Next <RightButton />
        </button>
      </div>
    </div>
  );
};
