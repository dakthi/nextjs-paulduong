import Image from "next/image";
import React from "react";
import { Container } from "@/components/Container";
import { VideoPlayer } from "./VideoPlayer";

interface BenefitsProps {
  imgPos?: "left" | "right";
  size?: "small" | "medium" | "large";
  data: {
    imgPos?: "left" | "right";
    title: string;
    desc: string;
    image?: string | { src: string };
    video?: string;
    buttons?: {
      label: string;
      href: string;
      variant?: "primary" | "secondary";
    }[];
    bullets: {
      title: string;
      desc: string;
      icon: React.ReactNode;
    }[];
  };
}

export const Benefits = (props: Readonly<BenefitsProps>) => {
  const { data } = props;

  return (
    <Container className="flex flex-wrap mb-20 lg:gap-10 lg:flex-nowrap pl-5 pr-5">
      {/* Media (image or video) */}
      <div
        className={`flex items-center justify-center w-full lg:w-1/2 ${
          props.imgPos === "right" ? "lg:order-1" : ""
        }`}
      >
        <div
          className={`w-full max-w-[450px] ${
            props.size === "small"
              ? "max-w-[350px]"
              : props.size === "large"
              ? "max-w-[600px]"
              : ""
          }`}
        >
          {data.video ? (
            <VideoPlayer src={data.video} />
          ) : data.image && (
            <div className="relative w-full aspect-[9/16] overflow-hidden rounded-lg shadow-lg">
              <Image
                src={typeof data.image === "string" ? data.image : data.image.src}
                fill
                alt="Benefits"
                className="object-cover"
                style={{
                  objectPosition: "center",
                  objectFit: "cover",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
            </div>
          )}
        </div>
      </div>

      {/* Text Content */}
      <div
        className={`flex flex-wrap items-center w-full lg:w-1/2 ${
          data.imgPos === "right" ? "lg:justify-end" : ""
        }`}
      >
        <div>
          {/* Title + Description */}
          <div className="flex flex-col w-full mt-4">
            <h3 className="max-w-2xl mt-3 text-3xl font-serif font-bold leading-snug tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#B8860B] lg:leading-tight lg:text-4xl">
              {data.title}
            </h3>

            <p className="max-w-2xl py-4 text-lg leading-normal text-gray-600 lg:text-xl xl:text-xl">
              {data.desc}
            </p>
          </div>

          {/* Bullet Points */}
          <div className="w-full mt-5">
            {data.bullets.map((item, index) => (
              <Benefit key={index} title={item.title} icon={item.icon}>
                {item.desc}
              </Benefit>
            ))}
          </div>

          {/* CTA Buttons */}
          {data.buttons?.length && (
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              {data.buttons.map((btn, idx) => (
                <a
                  key={idx}
                  href={btn.href}
                  className={`inline-block px-8 py-3 text-sm font-semibold rounded-full transition ${
                    btn.variant === "secondary"
                      ? "text-[#1a1a1a] border border-gray-300 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                      : "text-white bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:opacity-90"
                  }`}
                >
                  {btn.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

function Benefit(props: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start mt-8 space-x-3">
      <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] rounded-md w-11 h-11">
        {React.cloneElement(props.icon as React.ReactElement, {
          className: "w-7 h-7 text-white",
        })}
      </div>
      <div>
        <h4 className="text-xl font-medium text-gray-800">{props.title}</h4>
        <p className="mt-1 text-gray-600">{props.children}</p>
      </div>
    </div>
  );
}
