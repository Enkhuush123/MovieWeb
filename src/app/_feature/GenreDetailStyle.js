"use client";

import { useEffect, useState } from "react";
import { Genre } from "../_components/GenreCard";
import { useParams } from "next/navigation";
import { MovieCard } from "../_components/MovieCard";
import { GenreLoading } from "../_components/GenreDetailLoading";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const GenreStyle = () => {
  const [genreList, setGenreList] = useState([]);
  const [genreMovies, setGenreMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const param = useParams();
  const { id } = param;
  const apiGenreList = `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${id}&page=1`;
  const apiGenre = `https://api.themoviedb.org/3/genre/movie/list?language=en`;

  console.log(id, "genre");
  const getData = async (page = 1) => {
    setLoading(true);
    const data = await fetch(apiGenre, options);
    const jsonData = await data.json();
    setGenreList(jsonData.genres);
    console.log(jsonData, "genre1");

    console.log(apiGenreList, "genrei");

    const data02 = await fetch(`${apiGenreList}&page=${page}`, options);
    const jsonData02 = await data02.json();
    setGenreMovies(jsonData02.results);
    setTotalPages(jsonData02.total_pages);
    setTotalResults(jsonData02.total_results);
    setCurrentPage(page);
    console.log(genreMovies, "moive");
    setTimeout(() => setLoading(false), 600);
  };

  useEffect(() => {
    getData();
  }, [id]);

  if (loading) {
    return <GenreLoading />;
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
    <div className="flex flex-col gap-8 w-[1280px] max-sm:w-full  m-auto ">
      <div className="pl-20 max-sm:pl-5">
        <h1 className="font-semibold text-3xl">Search filter</h1>
      </div>
      <div className="w-[1440px] pr-20 pl-20 flex flex-row gap-8 max-sm:w-full max-sm:flex-col max-sm:pl-5 max-sm:pr-5 max-sm:justify-center max-sm:items-center m-auto">
        <div className="flex flex-col gap-5 max-sm:w-full ">
          <div className="flex gap-5 ">
            <div className=" w-[387px] flex flex-col flex-wrap  gap-5  rounded-lg w-max-sm:w-full  ">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-2xl">Genres</h3>
                <p>See lists of movies by genre </p>
              </div>

              <div className="flex flex-wrap gap-4 max-sm:w-full ">
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

        <div className="border-r max-sm:border-t max-sm:w-full"></div>

        <div>
          <div className="flex flex-col gap-10">
            <p>
              {totalResults} titles in &quot;
              {genreList.find((g) => g.id == id)?.name || "Genre"}&quot;
            </p>
            <div className="flex flex-wrap gap-8 w-auto max-sm:w-full max-sm:p-0">
              {genreMovies.slice(0, 9).map((movie, genres) => {
                return (
                  <MovieCard
                    key={movie.id}
                    img={movie.poster_path}
                    title={movie.title}
                    rate={movie.vote_average}
                    movieId={movie.id}
                    id={genres.id}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 w-full h-10 items-end justify-end  max-sm:w-full max-sm:p-0 max-sm:justify-center max-sm:gap-0 ">
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
