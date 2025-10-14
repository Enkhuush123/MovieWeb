"use client";

import { Footer } from "@/app/_feature/Footer";
import { Header } from "@/app/_feature/Header";
import { SimiliarMov } from "@/app/_feature/SimiliarMovie";

export default function SimiliarMovies() {
  return (
    <div className="flex flex-col w-[1440px] m-auto gap-13 max-sm:w-full max-sm:gap-0">
      <Header />
      <SimiliarMov />
      <Footer />
    </div>
  );
}
