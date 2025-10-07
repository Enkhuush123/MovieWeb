"use client ";

import { HeroSectionList } from "./_components/HeroSectionSlider";
import { PopularMovieSlide } from "./_components/PopularMovieSlider";
import { TopRatedMovieSlider } from "./_components/TopRatedMovieSlider";
import { UpComingMovieSlide } from "./_components/UpComingMovieSlider";
import { Footer } from "./_feature/Footer";
import { Header } from "./_feature/Header";

export default function Home() {
  return (
    <div className="flex flex-col w-[1440px] m-auto shadow-xs border-[#E4E4E7] gap-13 bg-white max-sm:w-full max-sm:gap-13   ">
      {/* {ImgUrl.map((item, key) => {
        return <Header key={key} />;
      })} */}
      <Header />
      <HeroSectionList />
      <UpComingMovieSlide />
      <PopularMovieSlide />
      <TopRatedMovieSlider />
      <Footer />
    </div>
  );
}
