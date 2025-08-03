"use client";

import Image from "next/image";
import React from "react";
import { Container } from "@/components/Container";

// Updated image paths
const testimonials = [
  {
    id: "1",
    quote: (
      <>
        “Since switching to NailPro Solutions, we’ve cut admin time in half.
        The system is simple, elegant — and <Mark>it actually fits how salons work</Mark>.”
      </>
    ),
    image: "/img/nails-photos-3.jpg",
    name: "Linh Pham",
    title: "Owner, Tones Studio Nails – Ho Chi Minh City",
  },
  {
    id: "2",
    quote: (
      <>
        “Clients love how easy it is to book. My staff love the calendar view.
        I love that I finally <Mark>own my own platform</Mark>.”
      </>
    ),
    image: "/img/nails-photos-4.jpg",
    name: "Chloe Tran",
    title: "Founder, Bare Beauty Lounge – London",
  },
  {
    id: "3",
    quote: (
      <>
        “We outgrew Google Calendar. NailPro Solutions let us grow into
        something more professional — without feeling like we lost control.”
      </>
    ),
    image: "/img/nails-photos-8.jpg",
    name: "Mai Nguyen",
    title: "Director, The Nail Room Collective – Melbourne",
  },
];

export const Testimonials = () => {
  return (
    <Container className="py-16">
      <div className="grid gap-12 lg:grid-cols-2 xl:grid-cols-3">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} {...testimonial} />
        ))}
      </div>
    </Container>
  );
};

// Testimonial Card
function TestimonialCard({
  quote,
  image,
  name,
  title,
}: {
  quote: React.ReactNode;
  image: string;
  name: string;
  title: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8 shadow-sm flex flex-col justify-between h-full">
      <p className="text-gray-800 text-base leading-relaxed lg:text-lg">{quote}</p>
      <Avatar image={image} name={name} title={title} />
    </div>
  );
}

// Avatar
function Avatar({
  image,
  name,
  title,
}: {
  image: string;
  name: string;
  title: string;
}) {
  return (
    <div className="flex items-center mt-6 space-x-3">
      <div className="w-12 h-12 rounded-full overflow-hidden">
        <Image
          src={image}
          width={48}
          height={48}
          alt={`Photo of ${name}`}
          className="object-cover"
        />
      </div>
      <div>
        <div className="text-sm font-semibold text-gray-900">{name}</div>
        <div className="text-sm text-gray-500">{title}</div>
      </div>
    </div>
  );
}

// Branded Highlight
function Mark({ children }: { children: React.ReactNode }) {
  return (
    <mark className="bg-gradient-to-br from-[#D4AF37] to-[#B8860B] text-white px-1.5 py-0.5 rounded-sm font-medium">
      {children}
    </mark>
  );
}
