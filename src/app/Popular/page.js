import { Footer } from "../_feature/Footer";
import { PopularShowMore } from "../_feature/PopularShowMore";
import { Header } from "../_feature/Header";

export default function Home() {
  return (
    <div className="flex flex-col w-[1440px] m-auto gap-13 bg-white">
      <Header />
      <PopularShowMore />
      <Footer />
    </div>
  );
}
