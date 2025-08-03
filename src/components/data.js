import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
} from "@heroicons/react/24/solid";

const benefitOne = {
  title: "Artistic Excellence in Nail Design",
  desc: "With a keen eye for detail and a passion for creating beautiful nail art, she transforms ordinary nails into stunning works of art. Each design is carefully crafted to reflect both current trends and timeless elegance.",
  video: "img/nails-video-3.mp4",
  bullets: [
    {
      title: "Professional Training & Certification",
      desc: "Certified nail technician with extensive training in modern techniques and safety protocols. Specializes in gel extensions, nail art, and innovative design applications.",
      icon: <FaceSmileIcon />,
    },
    {
      title: "Trend-Setting Designs",
      desc: "Stays ahead of the curve with continuous learning and adaptation of new techniques. From classic French manicures to avant-garde designs, each creation is unique and tailored to client preferences.",
      icon: <ChartBarSquareIcon />,
    },
    {
      title: "\"Every nail tells a story\"",
      desc: "Believes in creating not just beautiful nails, but meaningful expressions of personal style. Each design is carefully chosen to complement and enhance the client's individual aesthetic.",
      icon: <CursorArrowRaysIcon />,
    },
  ],
};

const benefitTwo = {
  title: "Commitment to Quality & Innovation",
  desc: "Dedicated to providing exceptional nail services while constantly evolving techniques and staying current with industry innovations. Quality and client satisfaction are always the top priorities.",
  video: "img/nails-video-4.mp4",
  bullets: [
    {
      title: "Premium Products & Techniques",
      desc: "Uses only high-quality, long-lasting products and implements the latest techniques to ensure beautiful, durable results. Every service is performed with precision and care.",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "Personalized Experience",
      desc: "Takes time to understand each client's vision and preferences, creating custom designs that perfectly match their style and personality. The goal is to exceed expectations with every visit.",
      icon: <AdjustmentsHorizontalIcon />,
    },
    {
      title: "\"Beauty meets innovation\"",
      desc: "Combines artistic creativity with technical expertise to deliver stunning results. Whether it's a simple manicure or an elaborate design, each service is executed with the same level of dedication and attention to detail.",
      icon: <SunIcon />,
    },
  ],
};

export { benefitOne, benefitTwo };
