"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import BurgerMenu from "./ui/burger-menu";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCompactMobileNav, setIsCompactMobileNav] = useState(false);

  const pathname = usePathname();
  const isHome = pathname === "/";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const updateNavState = () => {
      setIsCompactMobileNav(window.scrollY > 24);
    };

    updateNavState();
    window.addEventListener("scroll", updateNavState, { passive: true });
    window.addEventListener("resize", updateNavState);

    return () => {
      window.removeEventListener("scroll", updateNavState);
      window.removeEventListener("resize", updateNavState);
    };
  }, []);

  return (
    <nav
      className="!bg-surface shadow-md border-b border-surface fixed w-full top-0 z-50"
      style={{ backgroundColor: "#232323" }}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          isCompactMobileNav ? "py-3" : "py-4"
        }`}
      >
        <div
          className={`flex justify-between items-center transition-all duration-300 ${
            isCompactMobileNav ? "h-16" : "h-20"
          }`}
        >
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <img
                src="/UARC logo.png"
                alt="UARC Logo"
                className={`w-auto object-contain drop-shadow-lg transition-all duration-300 ${
                  isCompactMobileNav ? "h-12" : "h-14"
                }`}
                style={{ filter: "drop-shadow(0 10px 8px rgba(0,0,0,0.5))" }}
              />
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="/"
                aria-current={isHome ? "page" : undefined}
                className={`underline-animate px-4 py-2 rounded-none text-sm font-medium transition-colors uppercase ${isHome ? "text-primary" : "text-text-main hover:text-primary"}`}
              >
                HOME
              </Link>
              <Link
                href="/about"
                className="underline-animate text-text-main hover:text-primary px-4 py-2 rounded-none text-sm font-medium transition-colors uppercase"
              >
                ABOUT
              </Link>
              <Link
                href="/events"
                className="underline-animate text-text-main hover:text-primary px-4 py-2 rounded-none text-sm font-medium transition-colors uppercase"
              >
                EVENTS
              </Link>
              <Link
                href="/rockets"
                className="underline-animate text-text-main hover:text-primary px-4 py-2 rounded-none text-sm font-medium transition-colors uppercase"
              >
                ROCKETS
              </Link>
              <Link
                href="/sponsors"
                className="underline-animate text-text-main hover:text-primary px-4 py-2 rounded-none text-sm font-medium transition-colors uppercase"
              >
                SPONSORS
              </Link>
              <Link
                href="https://docs.google.com/forms/d/e/1FAIpQLSfS7PS--UX-fQinUfuYzVLV3-rM92cW7uVFOqoEVczgYLb8Qg/viewform?usp=sf_link"
                className="text-white px-6 py-2 rounded-lg text-base font-bold uppercase text-center"
                style={{
                  boxShadow: "0 4px 12px 0 rgba(0,0,0,0.25)",
                  background: "#ea580c",
                  color: "#ffffff",
                  transition: "all 0.2s ease-in-out",
                  transform: "scale(1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                SIGN UP
              </Link>
            </div>
          </div>

          {/* Burger menu button */}
          <div className="lg:hidden pr-2">
            <button
              onClick={toggleMenu}
              className="p-2 text-text-main hover:text-primary cursor-pointer focus:outline-none focus:text-primary"
            >
              <BurgerMenu isOpen={isMenuOpen} />
            </button>
          </div>
        </div>

        {/* Burger nav */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-4 sm:px-3 bg-surface border-t border-surface">
              {/* Links row - centered */}
              <div className="flex flex-wrap justify-center items-center gap-4">
                <Link
                  href="/"
                  aria-current={isHome ? "page" : undefined}
                  className={`underline-animate px-3 py-2 rounded-none text-sm font-medium uppercase text-center ${isHome ? "text-primary" : "text-text-main hover:text-primary"}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  HOME
                </Link>
                <span className="h-4 w-px bg-white/40" aria-hidden="true" />
                <Link
                  href="/about"
                  className="underline-animate text-text-main hover:text-primary px-3 py-2 rounded-none text-sm font-medium uppercase text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ABOUT
                </Link>
                <span className="h-4 w-px bg-white/40" aria-hidden="true" />
                <Link
                  href="/events"
                  className="underline-animate text-text-main hover:text-primary px-3 py-2 rounded-none text-sm font-medium uppercase text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  EVENTS
                </Link>
                <span className="h-4 w-px bg-white/40" aria-hidden="true" />
                <Link
                  href="/rockets"
                  className="underline-animate text-text-main hover:text-primary px-3 py-2 rounded-none text-sm font-medium uppercase text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ROCKETS
                </Link>
                <span className="h-4 w-px bg-white/40" aria-hidden="true" />
                <Link
                  href="/sponsors"
                  className="underline-animate text-text-main hover:text-primary px-3 py-2 rounded-none text-sm font-medium uppercase text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  SPONSORS
                </Link>
              </div>

              {/* Button - centered below links */}
              <div className="flex justify-center w-full">
                <Link
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfS7PS--UX-fQinUfuYzVLV3-rM92cW7uVFOqoEVczgYLb8Qg/viewform?usp=sf_link"
                  className="bg-primary hover:bg-[#a94425] text-white px-6 py-3 rounded-lg text-base font-bold uppercase text-center w-full"
                  style={{
                    boxShadow: "0 4px 12px 0 rgba(0,0,0,0.25)",
                    background: "#ea580c",
                    color: "#ffffff",
                    transition: "all 0.2s ease-in-out",
                    transform: "scale(1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                  onClick={() => setIsMenuOpen(false)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SIGN UP
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
