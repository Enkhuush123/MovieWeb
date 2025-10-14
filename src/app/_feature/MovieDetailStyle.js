"use client";

import { useEffect, useState } from "react";
import { Star } from "../_Icons/StarIcon";
import { useParams } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";
import { MovieCard } from "../_components/MovieCard";
import { Watch } from "../_Icons/WatchIcon";
import Link from "next/link";
import { MovieDetailLoading } from "../_components/MovieDetailLoading";

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
  const [loading, setLoading] = useState(false);

  const param = useParams();

  const { id } = param;
  const apiLink = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;

  const apiBase = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
  const apiSim = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`;
  const apiTrailer = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;

  const getData = async () => {
    setLoading(true);
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
    setTimeout(() => setLoading(false), 600);

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

  if (loading) {
    return <MovieDetailLoading />;
  }
  return (
    <div className="m-auto flex flex-col items-center max-sm:w-full gap-8  ">
      <div className=" flex flex-col w-[1080px]  gap-6 max-sm:w-full max-sm:gap-0   ">
        <div className="flex justify-between max-sm:p-5 ">
          <div className="flex flex-col gap-1 ">
            <div>
              <h1 className="font-bold text-4xl">{movieDetail.title}</h1>
            </div>
            <div className="flex flex-row gap-3 w-full">
              <p>{movieDetail.release_date}</p>·
              <p>{movieDetail.origin_country}</p>·<p>{hour}h</p>·
              <p>{minute}m</p>
            </div>
          </div>
          <div className="pr-3 flex flex-col items-center mt-3">
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
          className="flex flex-row gap-8 w-[1080px] h-[428px] max-sm:w-full max-sm:flex-col max-sm:h-[283px]
      "
        >
          <div className="w-[760px] h-[428px] relative max-sm:w-full max-sm:h-[283px] object-cover  ">
            <img
              className="w-[760px] h-[428px] rounded-lg absolute -z-10 max-sm:flex max-sm:relative max-sm:w-full max-sm:h-[283px] object-cover max-sm:rounded-none flex-shrink-0"
              src={
                movieDetail.backdrop_path
                  ? `https://image.tmdb.org/t/p/original${movieDetail.backdrop_path}`
                  : "/noimage.png"
              }
              alt={movieDetail.title}
            ></img>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-100 rounded-b-lg  ">
              <div className="flex items-end p-6  justify-start absolute inset-0">
                <div className="items-center flex gap-4 hover:scale-110">
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
          <div className="w-[290px] h-[428px] max-sm:w-full max-sm:h-full object-cover max-sm:hidden  ">
            <img
              className=" w-[290px] h-[428px] rounded-lg max-sm:w-[100px] max-sm:h-[148px] object-cover"
              src={
                movieDetail.poster_path
                  ? `https://image.tmdb.org/t/p/original${movieDetail.poster_path}`
                  : "/noimage.png"
              }
              alt={movieDetail.title}
            ></img>
          </div>
        </div>
      </div>
      <div className="flex gap-5 flex-col max-sm:p-5 w-[1080px] max-sm:w-full">
        <div className="flex flex-col gap-3 max-sm:flex-row max-sm:w-full">
          <div className="w-[290px] h-[428px] max-sm:w-full max-sm:h-full hidden max-sm:flex    ">
            <img
              className=" w-[290px] h-[428px] rounded-lg max-sm:w-[100px] max-sm:h-auto  max-sm:rounded-none flex-shrink-0   "
              src={
                movieDetail.poster_path
                  ? `https://image.tmdb.org/t/p/original${movieDetail.poster_path}`
                  : "/noimage.png"
              }
              alt={movieDetail.title}
            ></img>
          </div>
          <div className="max-sm:flex max-sm:flex-wrap flex flex-col gap-2">
            <div className="flex flex-wrap gap-3  max-sm:flex-row ">
              {movieDetail.genres?.map((genres) => {
                return (
                  <div
                    key={genres.id}
                    className=" h-[20px] p-2 rounded-full border flex items-center justify-center border-[#E4E4E7] font-semibold text-xs "
                  >
                    {genres.name}
                  </div>
                );
              })}
            </div>

            <div className="line-clamp-2 max-sm:h-auto max-sm:line-clamp-none">
              <p>{movieDetail.overview}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 max-sm:p-5">
          <div className="flex gap-12 font-bold text-base    ">
            Director
            <p className="font-normal text-justify">
              {director?.map((d) => d.name).join(" , ")}
            </p>
          </div>
          <div className="border-b border-gray-300"></div>

          <div className="flex gap-12 font-bold text-base">
            Writers
            <p className="font-normal">
              {" "}
              {writer?.map((w) => w.name).join(" · ")}
            </p>
          </div>
          <div className="border-b border-gray-300"></div>
          <div className="flex gap-12 font-bold text-base">
            Stars
            <p className="font-normal">
              {stars?.map((s) => s.name).join(" · ")}
            </p>
          </div>
          <div className="border-b border-gray-300"></div>
        </div>
      </div>

      <div className="flex gap-[52px] w-[1280px] max-sm:w-full max-sm:gap-0 ">
        <div className="flex flex-col  max-sm:p-5 gap-10 w-full">
          <div className="flex flex-row justify-between   ">
            <div>
              <h3 className="font-semibold text-2xl">More like this</h3>
            </div>

            <div>
              <Link href={`/similiar-movies/${id}`}>
                <p className="flex flex-row items-center gap-2 pr-[7px] cursor-pointer">
                  See More
                  <FaArrowRight className="w-[9px] h-[9px]" />
                </p>
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap gap-8 max-sm:w-full ">
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
      {showTrailer && trailer && (
        <div className="bg-black/90 fixed inset-0 bg-opacity-100 flex justify-center items-center z-50  ">
          <div>
            {trailer && trailer.key ? (
              <iframe
                width="1280"
                height="720"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="title"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="max-sm:w-full"
              ></iframe>
            ) : (
              <div>No Teaser available</div>
            )}
          </div>
          <div className="absolute top-30 right-100  justify-center items-center hover:scale-120 ">
            <h1
              onClick={() => setShowTrailer(false)}
              className="text-white cursor-pointer font-bold  text-4xl"
            >
              X
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};
