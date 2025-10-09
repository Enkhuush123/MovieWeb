"use client";
import { useParams } from "next/navigation";
import { Link } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { MovieCard } from "../_components/MovieCard";
import { SimiliarLoading } from "../_components/SimiliarLoading";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const SimiliarMov = () => {
  const [similar, setSimiliar] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const param = useParams();
  const { id } = param;
  const apiSim = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`;

  const getData = async (page = 1) => {
    setLoading(true);
    const data = await fetch(`${apiSim}&page=${page}`, options);
    const jsonData = await data.json();
    setSimiliar(jsonData.results);
    setTotalPages(Math.min(jsonData.total_pages, 50));
    setCurrentPage(page);
    setTimeout(() => setLoading(false), 600);
  };

  useEffect(() => {
    getData();
  }, [id]);

  if (loading) {
    return <SimiliarLoading />;
  }
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

  return (
    <div className="flex gap-[52px] w-[1440px] pl-20 max-sm:w-full max-sm:p-5 m-auto flex-col   ">
      <div>
        <div className="flex flex-row justify-between pt-[52px]">
          <h3 className="font-semibold text-2xl">More like this</h3>

          <div></div>
        </div>
        <div className="flex flex-wrap gap-8 items-center max-sm:w-full">
          {similar.slice(0, 15).map((movie) => {
            return (
              <MovieCard
                key={movie.id}
                img={`https://image.tmdb.org/t/p/original${movie.poster_path} `}
                rate={movie.vote_average}
                title={movie.title}
                id={movie.id}
                movieId={movie.id}
              />
            );
          })}
        </div>
      </div>
      <div className="flex gap-2 w-full h-10 items-end justify-end pr-[80px] max-sm:p-0 max-sm:w-full max-sm:gap-0 max-sm:justify-center ">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded flex items-center gap-1 cursor-pointer   ${
            currentPage === 1
              ? " cursor-not-allowed opacity-50"
              : " shadow-xs  "
          }`}
        >
          Prev
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
