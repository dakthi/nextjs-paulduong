// components/AboutUs.tsx
"use client";

import React from "react";
import Image from "next/image";
import { kalam } from "@/app/fonts"; // adjust path if fonts.ts is elsewhere

const AboutUs = () => {
  return (
    <section className="bg-[#fff9ec] font-serif text-gray-800 px-6 py-12 max-w-4xl mx-auto border border-[#e2d5ba] shadow-md rounded-md">
      <h2
        className={`text-5xl mb-8 text-center text-[#8B4513] ${kalam.className}`}
      >
        ABOUT US
      </h2>

      <div className="prose prose-lg prose-p:my-4 prose-p:text-justify max-w-none">
        <p>
          <strong>&apos;Cyclo&apos;</strong> has made a warm return to Bishop&apos;s Stortford!
        </p>
        <p>
          I&apos;m a proud Vietnamese woman who has travelled the world, experienced the finest things life has to offer, and reached some of the most prestigious milestones. But no matter where I go, what truly resonates with me — what brings me peace and warmth — has always been Vietnamese food.
        </p>
        <p>
          There&apos;s nothing quite as soothing as a warm bowl of <em>phở</em>. I always take my friends and business partners to Vietnamese restaurants to share the rich flavours of our cuisine.
        </p>
        <p>
          Now, being part of the Bishop&apos;s Stortford community with all its lovely people, I&apos;d love to extend the same invitation to you.
        </p>
        <p>
          It&apos;s not about having the most luxurious fine dining experience in the world. What truly matters to me is creating an atmosphere that feels like my family home on a Friday evening — where we gather around the table, share stories about the week, talk about what&apos;s ahead, and before we know it, we&apos;re deeply connected over a glass of wine after a hearty meal.
        </p>
        <p>
          I grew up in Saigon. My mother told me stories about the 1960s, and the image of the <strong>cyclo</strong> — those iconic three-wheeled taxis that once shuttled people around — is forever etched in my memory. That, and the distinct flavour of Saigon-style <em>phở</em>, is what I always carry with me and crave the most.
        </p>
        <p>
          Now that I&apos;ve brought Saigon <em>phở</em> here, maybe one day I&apos;ll bring the <strong>cyclo</strong> too — so we can ride to Tesco, Sainsbury&apos;s, or of course, to <strong>Cyclo Restaurant</strong>, where we can enjoy a good meal, share a laugh, and feel right at home.
        </p>
      </div>

      <div className="mt-10 border-t border-[#e2d5ba] pt-6">
        <Image
          src="/img/cyclo-saigon.webp"
          alt="Cyclo in 1960s Saigon"
          width={1200}
          height={800}
          className="w-full rounded-md shadow-sm"
        />
        <p className="text-sm text-center text-[#5b4636] italic mt-2">
          A timeless image of Saigon in the 1960s — the inspiration behind our name and spirit.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
