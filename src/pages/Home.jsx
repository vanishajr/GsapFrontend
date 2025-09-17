import React from "react";
import HeroSection from "../components/HeroSection";
import ScrollText from "../components/ScrollText";

function Home() {
  return (
    <div>
      <HeroSection />
      <ScrollText />
      <div className="flex-1 my-15 md:mt-0 flex justify-center md:justify-end w-full">
        <div className="w-full mx-5 md:mx-15 min-h-40 md:h-120 bg-grey rounded-md"></div>
      </div>
    </div>
  );
}
export default Home;