"use client";
import { Footer } from "@/app/_feature/Footer";
import { Header } from "@/app/_feature/Header";
import { MovieDetails } from "@/app/_feature/MovieDetailStyle";
import { useParams } from "next/navigation";

export default function MovieDetail() {
  return (
    <div className="flex flex-col m-auto shadow-xs border-[#E4E4E7] gap-13 w-[1440px] max-sm:w-full">
      <Header />
      <MovieDetails />
      <Footer />
    </div>
  );
}
