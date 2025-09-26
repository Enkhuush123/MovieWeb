"use client";

import { Footer } from "../_feature/Footer";
import { Header } from "../_feature/Header";
import { SeeUpcomingMovies } from "../_feature/SeeUpcomingMovies";

export default function Home() {
  return (
    <div className="flex flex-col w-[1440px] m-auto gap-13">
      <Header />
      <SeeUpcomingMovies />
      <Footer />
    </div>
  );
}
