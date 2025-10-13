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
import { SearchIcon } from "../_Icons/SearchIcon";

export const Header = ({}) => {
  const [openGenres, setOpenGenres] = useState(false);
  const [genreList, setGenreList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [mobielGenre, setMobileGenre] = useState(false);
  const [mobileBar, setMobileBar] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    const result = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchInpute}&language=en-US&page=1`,
      options
    );

    const jsonInputData = await result.json();
    setSearchResults(jsonInputData.results);
    setLoading(false);
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
    <div className="flex   max-sm:pl-5    justify-between  max-sm:p-0 max-sm:pt-5  pl-20 pt-3 pr-20 max-ms:w-full ">
      <div
        onClick={() => router.push("/")}
        className={`flex items-center  gap-2   transition max-sm:w-full ${
          mobileBar ? "hidden" : "flex"
        }`}
      >
        {" "}
        <div className="flex items-center gap-2 cursor-pointer hover:scale-110">
          <FilmIconPurple />
          <p className="text-indigo-700 font-bold text-base sm-text-lg ">
            Movie Z
          </p>
        </div>
      </div>
      <div className="flex items-center gap-8   max-sm:gap-2 max-sm:w-[120px] ">
        <button
          onClick={() => setMobileGenre(!mobielGenre)}
          className={` md:hidden transition w-9 h-9 border border-gray-300 rounded-lg flex justify-center items-center cursor-pointer ${
            mobileBar ? "block" : "hidden"
          }`}
        >
          <FaChevronDown className="opactiy-50 w-[14px] h-[10px]" />{" "}
        </button>
        {mobielGenre && (
          <div className="absolute w-[577px] bg-white max-sm:w-[100%] left-0  top-15 flex flex-col flex-wrap p-5 gap-5 shadow-xs rounded-lg border border-[#E4E4E7] z-50 ">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-2xl">Genres</h3>
              <p>See lists of movies by genre</p>
            </div>
            <div className="w-[537px] border border-[#E4E4E7]"></div>
            <div className="flex flex-wrap gap-4 max-sm:w-full  ">
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
        <div className=" max-sm:hidden flex items-center border border-[#E4E4E7] w-[97px] h-[36px] rounded-lg gap-2 justify-center font-medium text-sm hover:scale-103 z-50">
          <div
            className="flex items-center gap-2 cursor-pointer relative   "
            onClick={() => setOpenGenres(!openGenres)}
          >
            <FaChevronDown className="opactiy-50 w-[14px] h-[10px]" />
            Genre
          </div>
          {openGenres && (
            <div className="absolute w-[577px] bg-white  mt-95 ml-120 flex flex-col flex-wrap p-5 gap-5 shadow-xs rounded-lg border border-[#E4E4E7] z-50 ">
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
        <div>
          <div
            className=" flex items-center  gap-2 max-sm:flex max-sm:gap-0 max-sm:w-9 max-sm:h-9  w-[379px] h-[36px] rounded-lg p-3 border border-[#E4E4E7] max-sm:justify-center    ]
                "
          >
            <div className=" w-[11px] h-[11px]   ">
              <button
                className="hidden max-sm:flex cursor-pointer  "
                onClick={() => setMobileBar(!mobileBar)}
              >
                <SearchIcon />
              </button>
            </div>

            <div className=" w-[11px] h-[11px] flex items-center max-sm:hidden ">
              <SearchIcon />
            </div>
            <div className="max-sm:hidden w-[379px]  ">
              <input
                value={searchInput}
                onChange={searchHandle}
                className="pl-2 outline-none w-[335px] flex items-center "
                type="search"
                placeholder="Search"
              ></input>
            </div>
          </div>
        </div>
        <div>
          <button
            className={` rounded-lg w-[36px] h-[36px] border border-[#E4E4E7] flex items-center justify-center transition md:hidden ${
              mobileBar ? "hidden " : "flex"
            }`}
          >
            <MoonIcon />
          </button>
        </div>
      </div>

      <div>
        <button
          className={` rounded-lg w-[36px] h-[36px] border border-[#E4E4E7] flex items-center justify-center transition max-sm:hidden ${
            mobileBar ? "hidden " : "flex"
          }`}
        >
          <MoonIcon />
        </button>
      </div>

      {mobileBar && (
        <div className=" max-sm:w-full hidden max-sm:flex  ">
          <input
            value={searchInput}
            onChange={searchHandle}
            className="pl-2 outline-none max-sm:w-full pr-2 "
            type="search"
            placeholder="Search"
          ></input>
        </div>
      )}
      {loading && (
        <div className="w-[537px] h-[100px] bg-white absolute max-sm:w-full  max-sm:absolute max-sm:left-0 flex justify-center left-250 items-center flex-col top-20  z-50 shadow rounded-lg ">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-6 h-6 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
        </div>
      )}
      {!loading && searchInput && searchResults.length === 0 && (
        <div className="w-[537px] h-[100px] bg-white absolute max-sm:w-full  max-sm:absolute max-sm:left-0 flex justify-center left-250 items-center flex-col top-20  z-50 shadow rounded-lg">
          <p className="text-gray-600 text-sm font-medium">No results found</p>
        </div>
      )}
      {searchResults.length > 0 && (
        <div className="w-[537px] h-auto bg-white absolute max-sm:w-full  max-sm:absolute max-sm:left-0 flex justify-center items-center left-250 flex-col top-20  z-50 shadow rounded-lg ">
          {searchResults.slice(0, 5).map((movie) => {
            return (
              <div
                onClick={() => router.push(`/movie-detail/${movie.id}`)}
                className="w-[537px] h-auto flex gap-3 hover:bg-black hover:text-white p-2 border-b border-gray-300  cursor-pointer z-50 max-sm:w-full  "
                key={movie.id}
                title={movie.title}
              >
                <div className="w-[67px] h-[100px] flex-shrink-0">
                  <img
                    className="w-[67px] h-[100px] rounded object-cover max-sm:w-full  "
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  ></img>
                </div>
                <div className="flex flex-col w-full ">
                  <div>{movie.title}</div>
                  <div className="flex  items-center gap-1 text-sm">
                    <Star />{" "}
                    <p>
                      {movie.vote_average}
                      <span className="text-xs text-gray-500">/10</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-end justify-end w-full   ">
                  <p>{movie.release_date}</p>
                </div>
              </div>
            );
          })}
          <div
            onClick={() => router.push(`/search-detail/${searchInput}`)}
            className="w-[230p] h-[40px] flex  items-center cursor-pointer "
          >
            See all results for &quot;{searchInput}&quot;
          </div>
        </div>
      )}
    </div>
  );
};
