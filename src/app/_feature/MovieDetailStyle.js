"use client";

import { useEffect, useState } from "react";
import { Star } from "../_Icons/StarIcon";
import { useParams } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";
import { MovieCard } from "../_components/MovieCard";
import { Watch } from "../_Icons/WatchIcon";
import Link from "next/link";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const MovieDetails = () => {
  const [movieDetail, setMovieDetail] = useState([]);
  const [credits, setCredits] = useState([]);
  const [similiar, setSimiliar] = useState([]);
  const [trailer, setTrailer] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);

  const param = useParams();

  const { id } = param;
  const apiLink = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;

  const apiBase = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
  const apiSim = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`;
  const apiTrailer = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;

  if (!movieDetail || !credits) {
    return <div>Loading...</div>;
  }
  const getData = async () => {
    const data = await fetch(apiLink, options);
    const jsonData = await data.json();
    setMovieDetail(jsonData);
    console.log(jsonData, "kk");
    const data02 = await fetch(apiBase, options);
    const jsonData02 = await data02.json();
    setCredits(jsonData02);
    console.log(jsonData02, "writer");
    const data03 = await fetch(apiSim, options);
    const jsonData03 = await data03.json();
    setSimiliar(jsonData03.results);

    const data04 = await fetch(apiTrailer, options);
    const jsonData04 = await data04.json();
    const OffTrailer =
      jsonData04.results.find(
        (trail) => trail.type === "Trailer" && trail.site === "YouTube"
      ) ||
      jsonData04.results.find(
        (trail) => trail.type === "Teaser" && trail.site === "YouTube"
      );

    setTrailer(OffTrailer);
    console.log(jsonData04, "trailer");
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getData();
  }, [id]);

  const hour = Math.floor(movieDetail.runtime / 60);
  const minute = movieDetail.runtime % 60;

  const director = credits?.crew
    ?.filter((direct) => direct.job === "Director")
    .slice(0, 3);
  const writer = credits?.crew
    ?.filter(
      (writer) => writer.job === "Writer" || writer.department === "Writing"
    )
    .slice(0, 3);

  const stars = credits?.cast?.slice(0, 3);

  return (
    <div className="m-auto flex flex-col items-center ">
      <div className=" flex flex-col w-[1080px]  gap-6">
        <div className="flex justify-between">
          <div className="flex flex-col ">
            <div>
              <h1 className="font-bold text-4xl">{movieDetail.title}</h1>
            </div>
            <div className="flex flex-row gap-3">
              <p>{movieDetail.release_date}</p>·
              <p>{movieDetail.origin_country}</p>·<p>{hour}h</p>·
              <p>{minute}m</p>
            </div>
          </div>
          <div className="pr-3 flex flex-col">
            <div>
              <p className="font-medium text-xs">Rating:</p>
            </div>
            <div className="flex gap-[4px] items-center ">
              <Star />
              <p className="font-semibold text-lg">
                {movieDetail.vote_average}
              </p>
              <span className="text-xs text-gray-500 items-center">/10</span>
            </div>
            <div className="text-xs text-gray-500 items-center">
              <p>{movieDetail.popularity?.toFixed()}K</p>
            </div>
          </div>
        </div>
        <div
          className="flex flex-row gap-8 w-[1080px] h-[428px]
      "
        >
          <div className="w-[290px] h-[428px] ">
            <img
              className=" w-[290px] h-[428px] rounded-lg"
              src={`https://image.tmdb.org/t/p/original${movieDetail.poster_path}`}
              alt={movieDetail.title}
            ></img>
          </div>

          <div className="w-[760px] h-[428px] relative ">
            <img
              className="w-[760px] h-[428px] rounded-lg absolute -z-10"
              src={`https://image.tmdb.org/t/p/original${movieDetail.backdrop_path}`}
              alt={movieDetail.title}
            ></img>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-100 ">
              <div className="flex items-end p-6 h-full">
                <div className="items-center flex gap-4">
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="w-10 h-10 rounded-full bg-white items-center justify-center flex cursor-pointer "
                  >
                    <Watch />
                  </button>
                  <p className="text-white items-center justify-center">
                    Play trailer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showTrailer && trailer && (
          <div className="bg-black fixed inset-0 bg-opacity-50 flex justify-center items-center ">
            <div>
              {trailer ? (
                <iframe
                  width="1639"
                  height="922"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="title"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              ) : (
                <div>No Teaser available</div>
              )}
            </div>
            <div className="absolute bg-black top-10 right-80 rounded-lg justify-center items-center ">
              <button
                onClick={() => setShowTrailer(false)}
                className="text-white cursor-pointer"
              >
                X Close
              </button>
            </div>
          </div>
        )}

        <div className="flex gap-5 flex-col">
          <div className="flex flex-row gap-3">
            {movieDetail.genres?.map((genres) => {
              return (
                <div
                  key={genres.id}
                  className=" h-[20px] p-2 rounded-full border flex items-center justify-center border-[#E4E4E7] font-semibold text-xs cursor-pointer"
                >
                  {genres.name}
                </div>
              );
            })}
          </div>
          <div className="line-clamp-2">
            <p>{movieDetail.overview}</p>
          </div>
          <div className="flex gap-12 font-bold text-base">
            Director
            <p className="font-normal">
              {director?.map((d) => d.name).join(" , ")}
            </p>
          </div>
          <div className="flex gap-12 font-bold text-base">
            Writers
            <p className="font-normal">
              {" "}
              {writer?.map((w) => w.name).join(" · ")}
            </p>
          </div>
          <div className="flex gap-12 font-bold text-base">
            Stars
            <p className="font-normal">
              {stars?.map((s) => s.name).join(" · ")}
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-[52px] w-[1280px] ">
        <div>
          <div className="flex flex-row justify-between pt-[52px]">
            <h3 className="font-semibold text-2xl">More like this</h3>

            <div>
              <Link href={`/similiar-movies/${id}`}>
                <p className="flex flex-row items-center gap-2 pr-[7px] cursor-pointer">
                  See More
                  <FaArrowRight className="w-[9px] h-[9px]" />
                </p>
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap gap-8">
            {similiar.slice(0, 5).map((movie) => {
              return (
                <MovieCard
                  key={movie.id}
                  img={`https://image.tmdb.org/t/p/original${movie.poster_path} `}
                  rate={movie.vote_average}
                  title={movie.title}
                  movieId={movie.id}
                  id={movie.id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
