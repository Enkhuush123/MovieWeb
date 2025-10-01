"use client";
import { useParams } from "next/navigation";
import { Link } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { MovieCard } from "../_components/MovieCard";
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

  const param = useParams();
  const { id } = param;
  const apiSim = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`;

  const getData = async () => {
    const data = await fetch(apiSim, options);
    const jsonData = await data.json();
    setSimiliar(jsonData.results);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="flex gap-[52px] w-[1440px] pl-20 ">
      <div>
        <div className="flex flex-row justify-between pt-[52px]">
          <h3 className="font-semibold text-2xl">More like this</h3>

          <div>
            {/* <Link href={`/similiar-movies/${id}`}>
              <p className="flex flex-row items-center gap-2 pr-[7px] cursor-pointer">
                See More
                <FaArrowRight className="w-[9px] h-[9px]" />
              </p>
            </Link> */}
          </div>
        </div>
        <div className="flex flex-wrap gap-8 items-center">
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
    </div>
  );
};
