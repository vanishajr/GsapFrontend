import React from 'react';
import Img1 from '../assets/Img1.png';
import Img2 from '../assets/Img2.png';
import Img3 from '../assets/Img3.png';

const CardsShowcase = () => {
  return (
    <div className="cards absolute -top-[400px] md:top-0 inset-0 flex items-center justify-center" style={{ pointerEvents: 'none' }}>
      <div className="cards-row flex flex-col md:flex-row items-center md:items-stretch gap-8 md:gap-8">
        <div className="card w-56 md:w-64 lg:w-72 h-56 md:h-72 lg:h-80 rounded-xl bg-[#0B0B0B] border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
          <div className="h-full w-full p-4 text-white/80 items-center justify-center gap-5 text-sm md:text-base flex flex-col">
            <img
              src={Img1}
              alt="Choose a game"
              className="w-full h-20 md:h-32 object-cover mb-3"
            />
            <div className="font-medium text-xl">Choose a game</div>
            <div className="text-xs text-center text-white/60">Browse our collection of interactive games that fit your audience</div>
          </div>
        </div>
        <div className="card w-56 md:w-64 lg:w-72 md:h-72 lg:h-80 rounded-xl bg-[#0B0B0B] border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
          <div className="h-full w-full p-4 items-center justify-center gap-5 text-white/80 text-sm md:text-base flex flex-col">
            <img
              src={Img2}
              alt="Choose a game"
              className="w-full h-20 md:h-32 object-contain md:object-cover mb-3"
              style={{ objectPosition: "center 40%" }}
            />
            <div className="font-medium text-center text-xl">Customize & Configure</div>
            <div className="text-xs text-center text-white/60">Set up triggers, rewards, and visual elements without writing code.</div>
          </div>
        </div>
        <div className="card w-56 md:w-64 lg:w-72 h-56 md:h-72 lg:h-80 rounded-xl bg-[#0B0B0B] border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
          <div className="h-full w-full p-4 items-center justify-center gap-5 text-white/80 text-sm md:text-base flex flex-col">
            <img
              src={Img3}
              alt="Choose a game"
              className="w-full h-20 md:h-32 object-cover mb-3"
            />
            <div className="font-medium text-xl">Deploy Instantly</div>
            <div className="text-xs text-center text-white/60"> Add a single line of code and start boosting engagement immediately.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsShowcase;


