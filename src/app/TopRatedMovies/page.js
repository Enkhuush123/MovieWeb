import { Footer } from "../_feature/Footer";
import { Header } from "../_feature/Header";
import { SeeMoreTopRated } from "../_feature/SeeMoreTopRated";

export default function Home() {
  return (
    <div className="flex flex-col w-[1440px] m-auto gap-13 max-sm:w-full ">
      <Header />
      <SeeMoreTopRated />
      <Footer />
    </div>
  );
}
