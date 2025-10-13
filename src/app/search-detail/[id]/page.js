"use client";

import { Footer } from "@/app/_feature/Footer";
import { Header } from "@/app/_feature/Header";
import { SearchPop } from "@/app/_feature/SearchPopUp";

export default function SearchMovies() {
  return (
    <div className="flex flex-col w-[1440px] m-auto  gap-13 max-sm:w-full">
      <Header />
      <SearchPop />
      <Footer />
    </div>
  );
}
