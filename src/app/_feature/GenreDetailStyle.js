"use client";

import { useEffect, useState } from "react";
import { Genre } from "../_components/GenreCard";
import { useParams } from "next/navigation";

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

  const param = useParams();
  const { genreId } = param;

  console.log(genreId, "genre");
  const getData = async () => {
    const apiGenre = `https://api.themoviedb.org/3/genre/movie/list?language=en`;
    const apiGenreList = `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreId}&page=1`;
    const data = await fetch(apiGenre, options);
    const jsonData = await data.json();
    setGenreList(jsonData.genres);
    console.log(jsonData, "genre");
    const data01 = await fetch(apiGenreList, options);
    const jsonData01 = await data01.json();
    setGenreMovies(jsonData01.results);
    console.log(jsonData01, "genre");
  };

  useEffect(() => {
    getData();
  }, [genreId]);

  return (
    <div className="w-[1440px] pr-20 pl-20 flex flex-col gap-8">
      <div>
        <h1 className="font-semibold text-3xl">Search filter</h1>
      </div>
      <div className="flex gap-5 ">
        <div className=" w-[387px] flex flex-col flex-wrap  gap-5  rounded-lg  ">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-2xl">Genres</h3>
            <p>See lists of movies by genre</p>
          </div>

          <div className="flex flex-wrap gap-4  ">
            {genreList.map((genres) => {
              return (
                <Genre key={genres.id} name={genres.name} genreId={genres.id} />
              );
            })}
          </div>
        </div>
      </div>
      <div>
        <div>
          <p>81 titles in "Animation"</p>
        </div>
      </div>
    </div>
  );
};
