"use client";

import { Footer } from "@/app/_feature/Footer";
import { GenreStyle } from "@/app/_feature/GenreDetailStyle";
import { Header } from "@/app/_feature/Header";

export default function GenreDetail() {
  return (
    <div className="flex flex-col w-[1440px] m-auto shadow-xs  gap-13  max-sm:w-full">
      <Header />
      <GenreStyle />
      <Footer />
    </div>
  );
}
