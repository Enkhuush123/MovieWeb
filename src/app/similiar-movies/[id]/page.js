"use client";

import { Footer } from "@/app/_feature/Footer";
import { Header } from "@/app/_feature/Header";
import { SimiliarMov } from "@/app/_feature/SimiliarMovie";

export default function SimiliarMovies() {
  return (
    <div className="flex flex-col w-[1440px] m-auto gap-13 bg-white">
      <Header />
      <SimiliarMov />
      <Footer />
    </div>
  );
}
