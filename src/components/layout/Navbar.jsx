import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const menuItemsRef = useRef([]);
  const mobileTlRef = useRef(null);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { 
        y: 80, 
        opacity: 0, 
        scale: 0.8,
        rotationX: -15
      },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        rotationX: 0,
        duration: 1.5, 
        ease: "power2.out",
        delay: 0.2
      }
    );
  }, []);

  useEffect(() => {
    if (mobileTlRef.current) {
      mobileTlRef.current.kill();
      mobileTlRef.current = null;
    }

    if (menuOpen) {
      setIsMenuVisible(true);
      requestAnimationFrame(() => {
        if (!mobileMenuRef.current) return;

        menuItemsRef.current = menuItemsRef.current.slice(0, 6);

        gsap.set(mobileMenuRef.current, {
          opacity: 0,
          y: -8,
          scaleY: 0.92,
          transformOrigin: "top center",
          willChange: "transform, opacity"
        });
        gsap.set(menuItemsRef.current, { opacity: 0, y: 12, willChange: "transform, opacity" });

        const tl = gsap.timeline();
        mobileTlRef.current = tl;

        tl.to(mobileMenuRef.current, {
          opacity: 1,
          y: 0,
          scaleY: 1,
          duration: 1.0,
          ease: "power2.out"
        }).to(
          menuItemsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.12
          },
          "-=0.5"
        );
      });
    } else if (isMenuVisible && mobileMenuRef.current) {
      const tl = gsap.timeline({ onComplete: () => setIsMenuVisible(false) });
      mobileTlRef.current = tl;
      tl.to([...menuItemsRef.current].reverse(), {
        opacity: 0,
        y: -18,
        duration: 0.6,
        ease: "power2.in",
        stagger: 0.1
      }).to(
        mobileMenuRef.current,
        {
          opacity: 0,
          y: -16,
          scaleY: 0.86,
          duration: 0.7,
          ease: "power2.inOut",
          clearProps: "willChange,transform,opacity"
        },
        "-=0.1"
      );
    }

    return () => {
      if (mobileTlRef.current) {
        mobileTlRef.current.kill();
        mobileTlRef.current = null;
      }
    };
  }, [menuOpen, isMenuVisible]);

  const links = [
    { to: "/", label: "Link 1" },
    { to: "/link2", label: "Link 2" },
    { to: "/link3", label: "Link 3" },
    { to: "/link4", label: "Link 4" },
    { to: "/link5", label: "Link 5" },
    { to: "/login", label: "Login" },
  ];

  return (
    <nav ref={navRef} className="w-full p-4 bg-black">
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center justify-center">
        <ul className="flex items-center gap-4 p-4 rounded-full bg-neutral-900 text-sm shadow-lg">
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`px-4 py-2 rounded-full transition ${
                  label === "Login"
                    ? "bg-white text-black"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Hamburger */}
      <div className="flex md:hidden items-center justify-end">
        <button
          className="text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuVisible && (
        <div 
          ref={mobileMenuRef}
          className="flex flex-col items-center gap-4 py-6 bg-neutral-900 shadow-md md:hidden mt-4 rounded-xl mx-4 overflow-hidden"
        >
          {links.map(({ to, label }, index) => (
            <Link
              key={to}
              ref={el => menuItemsRef.current[index] = el}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={`px-4 py-2 rounded-full transition ${
                label === "Login"
                  ? "bg-white text-black"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
