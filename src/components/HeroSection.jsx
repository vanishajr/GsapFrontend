import React, { useEffect, useRef } from "react";
import Button from "./Ui/Button";
import { gsap } from "gsap";

function HeroSection() {
  const heroRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.set([leftRef.current, rightRef.current], { opacity: 0 });

      const tl = gsap.timeline({ defaults: { duration: 1.5, ease: "power2.out" } });
      tl.fromTo(
        leftRef.current,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1 }
      ).fromTo(
        rightRef.current,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1 },
        "<0.3"
      );
    });

    mm.add("(max-width: 767px)", () => {
      gsap.set([leftRef.current, rightRef.current], { opacity: 0 });

      const tl = gsap.timeline({ defaults: { duration: 1.5, ease: "power2.out" } });
      tl.fromTo(
        [leftRef.current, rightRef.current],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.9 }
      );
    });

    return () => {
      mm.revert();
    };
  }, []);
  return (
    <section ref={heroRef} className="w-full min-h-screen flex flex-col md:flex-row md:items-start items-center justify-between px-6 md:p-16 lg:py-24 mx-auto max-w-7xl md:gap-10">
      <div ref={leftRef} className="flex-1 flex flex-col items-start justify-center text-left max-w-xl gap-6">
        <h1 className="text-xl md:text-3xl lg:text-5xl font-extrabold leading-tight">
          AI powered shortcut for <br className="hidden sm:block" />
          gamification!
        </h1>
        <p className="text-gray-300 text-base md:text-lg leading-relaxed">
          Add fully-branded mini-games onto any website. Increase engagement, 
          collect leads, and reward customers.
        </p>

        <div className="flex gap-4 md:mt-15">
          <Button variant="primary" size="sm">Try Early access</Button>
          <Button variant="outline" size="sm">View Demo</Button>
        </div>
      </div>

      <div ref={rightRef} className="flex-1 my-15 md:mt-0 flex justify-center md:justify-end w-full">
        <div className="w-full min-h-40 md:h-120 bg-grey rounded-md"></div>
      </div>
    </section>
  );
}

export default HeroSection;
