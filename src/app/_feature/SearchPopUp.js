"use client";

import { useEffect, useState } from "react";
import { RightButton } from "../_Icons/RightIcon";
import { Star } from "../_Icons/StarIcon";
import { useParams } from "next/navigation";
import { MovieCard } from "../_components/MovieCard";
import { Genre } from "../_components/GenreCard";
import { SearchPopLoading } from "../_components/SearchPopLoading";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const SearchPop = () => {
  const [searchResultsMovie, setSearchResultsMovie] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [searchResult, setSearchResult] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  console.log(searchResultsMovie, "search");
  const params = useParams();

  const { id } = params;

  const apiSearch = `https://api.themoviedb.org/3/search/movie?query=${id}&language=en-US&page=1`;
  const apiGenre = `https://api.themoviedb.org/3/genre/movie/list?language=en`;

  const getData = async (page = 1) => {
    setLoading(true);
    const data01 = await fetch(apiGenre, options);
    const jsonData01 = await data01.json();
    setGenreList(jsonData01.genres);
    const data = await fetch(`${apiSearch}&page=${page}`, options);
    const jsonData = await data.json();
    setSearchResultsMovie(jsonData.results);
    setSearchResult(jsonData.total_results);

    setTotalPages(jsonData.total_pages);
    setCurrentPage(page);
    setTimeout(() => setLoading(false), 600);
  };

  useEffect(() => {
    getData();
  }, [id]);

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
    return <SearchPopLoading />;
  }

  return (
    <div className=" flex flex-col gap-8 m-auto max-sm:w-full">
      <div className="pl-20 max-sm:pl-5">
        <p className="font-semibold text-3xl">Search results</p>
      </div>
      <div className="w-[1440px] pr-20 pl-20 flex flex-row gap-8 max-sm:w-full max-sm:p-5 max-sm:flex-col">
        <div className="flex flex-col gap-7 max-sm:w-full">
          <div className="flex  flex-col max-sm:w-full gap-10 ">
            <div className="max-sm:w-full">
              <p>
                {searchResult} results for &quot;{id}&quot;
              </p>
            </div>
            <div className="flex flex-wrap gap-8 max-sm:w-full">
              {searchResultsMovie.slice(0, 9).map((movie) => {
                return (
                  <MovieCard
                    key={movie.id}
                    movieId={movie.id}
                    img={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                        : "/noimage.png"
                    }
                    id={movie.id}
                    title={movie.title}
                    rate={movie.vote_average}
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
        <div className="border-r max-sm:border-b border-gray-300"></div>
        <div className="flex flex-col gap-5 ">
          <div className="flex gap-5 ">
            <div className=" w-[387px] flex flex-col flex-wrap  gap-5  rounded-lg  ">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-2xl">Genres</h3>
                <p>See lists of movies by genre </p>
              </div>

              <div className="flex flex-wrap gap-4  ">
                {genreList.map((genres) => {
                  return (
                    <Genre
                      key={genres.id}
                      name={genres.name}
                      id={genres.id}
                      genresId={genres.id}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
