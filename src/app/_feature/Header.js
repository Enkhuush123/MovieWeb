"use client";

import { FaChevronDown, FaSearch } from "react-icons/fa";
import { MoonIcon } from "../_Icons/MoonIcon";

import { FilmIconPurple } from "../_Icons/FilmIconPurple";

import { Genre } from "../_components/GenreCard";
import { useEffect, useState } from "react";
import { SearchPop } from "./SearchPopUp";
import { Star } from "../_Icons/StarIcon";
import { RightButton } from "../_Icons/RightIcon";
import { useRouter } from "next/navigation";

export const Header = ({}) => {
  const [openGenres, setOpenGenres] = useState(false);
  const [genreList, setGenreList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const apiLink = "https://api.themoviedb.org/3/genre/movie/list?language=en";
  const router = useRouter();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
    },
  };

  const searchHandle = async (e) => {
    const searchInpute = e.target.value;
    setSearchInput(searchInpute);
    console.log(searchInpute, "search");

    if (!searchInpute) {
      setSearchResults([]);
      return;
    }

    const result = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchInpute}&language=en-US&page=1`,
      options
    );

    const jsonInputData = await result.json();
    setSearchResults(jsonInputData.results);
  };

  const getData = async () => {
    const data = await fetch(apiLink, options);
    const jsonData = await data.json();
    setGenreList(jsonData.genres);
  };
  console.log(genreList, "haha");
  console.log(searchInput, "lol");

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex  flex-row justify-between items-center pl-20 pt-3 pr-20 ">
      <div
        onClick={() => router.push("/")}
        className="flex items-center  gap-2 cursor-pointer hover:scale-110"
      >
        <FilmIconPurple />
        <p className="text-indigo-700 font-bold text-base ">Movie Z</p>
      </div>

      <div className="flex items-center gap-8 ">
        <div className="flex items-center border border-[#E4E4E7] w-[97px] h-[36px] rounded-lg gap-2 justify-center font-medium text-sm ">
          <div className="flex items-center gap-2 cursor-pointer relative ">
            <FaChevronDown className="opactiy-50 w-[14px] h-[10px]" />
            <button
              className="cursor-pointer"
              onClick={() => setOpenGenres(!openGenres)}
            >
              {" "}
              Genre
            </button>
          </div>
          {openGenres && (
            <div className="absolute w-[577px] bg-white mt-95 ml-120 flex flex-col flex-wrap p-5 gap-5 shadow-xs rounded-lg border border-[#E4E4E7] z-50 ">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-2xl">Genres</h3>
                <p>See lists of movies by genre</p>
              </div>
              <div className="w-[537px] border border-[#E4E4E7]"></div>
              <div className="flex flex-wrap gap-4  ">
                {genreList.map((genres) => {
                  return (
                    <Genre
                      key={genres.id}
                      name={genres.name}
                      genresId={genres.id}
                      id={genres.id}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div
          className="flex items-center gap-2   w-[379px] h-[36px] rounded-lg p-3 border border-[#E4E4E7]
                "
        >
          <FaSearch className="opacity-50 w-[11px] h-[11px] " />
          <input
            value={searchInput}
            onChange={searchHandle}
            className="pl-2 outline-none"
            type="search"
            placeholder="Search"
          ></input>
          {searchResults.length > 0 && (
            <div className="w-[577px] h-auto bg-white absolute top-20 z-50 flex flex-col gap-0 ">
              {searchResults.slice(0, 5).map((movie) => {
                return (
                  <div
                    onClick={() => router.push(`/movie-detail/${movie.id}`)}
                    className="w-[553px] h-[116px] flex gap-3 hover:bg-black hover:text-white p-2 border-b border-gray-300 hover:scale-110 cursor-pointer "
                    key={movie.id}
                    title={movie.title}
                  >
                    <div>
                      <img
                        className="w-[67px] h-[100px] rounded object-cover"
                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      ></img>
                    </div>
                    <div className="flex flex-col ">
                      <div>{movie.title}</div>
                      <div className="flex flex-row items-center gap-1">
                        <Star />{" "}
                        <p>
                          {movie.vote_average}
                          <span className="text-xs text-gray-500">/10</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row ">
                      <div className="flex  ">
                        <p>2024</p>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div
                onClick={() => router.push(`/search-detail/${searchInput}`)}
                className="w-[230px] h-[40px] flex pl-4 items-center cursor-pointer"
              >
                See all results for &quot;{searchInput}&quot;
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        <button className=" rounded-lg w-[36px] h-[36px] border border-[#E4E4E7] flex items-center justify-center">
          <MoonIcon />
        </button>
      </div>
    </div>
  );
};
