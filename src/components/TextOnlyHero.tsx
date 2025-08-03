"use client";

import { Container } from "@/components/Container";
import { useCallback } from "react";

export const TextOnlyHero = () => {
  const handleScrollToCollections = useCallback(() => {
    const el = document.getElementById("collections");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        src="/img/nails-video-5.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
      >
        Sorry, your browser doesn&apos;t support embedded videos.
      </video>

      {/* Text Content */}
      <Container className="relative z-10 py-10 lg:py-16 h-full flex items-center">
        <div className="max-w-3xl px-4">
          <h1 className="text-xl font-semibold text-black lg:text-3xl xl:text-4xl mb-4">
            NailPro Solutions: The System Behind the Salon
          </h1>
          <p className="text-sm text-gray-800 leading-relaxed lg:text-base">
            Built for modern nail professionals, NailPro Solutions gives you the power to manage 
            bookings, staff, and client relationships — all in one elegant, ownable platform.
            Say goodbye to clunky apps and recurring fees. Say hello to your own digital foundation.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <button
              onClick={handleScrollToCollections}
              className="px-6 py-2 text-sm font-semibold text-white bg-black rounded-full hover:bg-gray-800 transition"
            >
              Explore Features
            </button>
            <a
              href="#learn"
              className="text-sm font-medium text-gray-700 hover:text-black transition"
            >
              Learn More
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
};
