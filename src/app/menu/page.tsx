'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Container } from '@/components/Container';

import DrinksMenu from '@/components/menus/DrinksMenu';
import PhoMenu from '@/components/menus/PhoMenu';
import BunMenu from '@/components/menus/BunMenu';
import StartersMenu from '@/components/menus/StartersMenu';
import SignatureMainCourse from '@/components/menus/SignatureMainCourse';
import SetMenu from '@/components/menus/SetMenu';
import SpecialOrder from '@/components/menus/SpecialOrder';

// Optional: Map title to component key if needed later
const menus = [
  {
    title: 'Starters',
    image: '/img/saigon-cyclo.jpg',
    component: 'StartersMenu',
  },
  {
    title: 'Signature Main Course',
    image: '/img/saigon-cyclo.jpg',
    component: 'SignatureMainCourse',
  },
  {
    title: 'Pho',
    image: '/img/saigon-cyclo.jpg',
    component: 'PhoMenu',
  },
  {
    title: 'Bun',
    image: '/img/saigon-cyclo.jpg',
    component: 'BunMenu',
  },
  {
    title: 'Set Menu',
    image: '/img/saigon-cyclo.jpg',
    component: 'SetMenu',
  },
  {
    title: 'Special Order',
    image: '/img/saigon-cyclo.jpg',
    component: 'SpecialOrder',
  },
  {
    title: 'Soft Drinks',
    image: '/img/saigon-cyclo.jpg',
    component: 'DrinksMenu',
  },
  {
    title: 'Cocktails and Wines',
    image: '/img/saigon-cyclo.jpg',
    component: 'DrinksMenu',
  },
];

const componentMap: Record<string, React.ReactNode> = {
  DrinksMenu: <DrinksMenu />,
  PhoMenu: <PhoMenu />,
  BunMenu: <BunMenu />,
  StartersMenu: <StartersMenu />,
  SignatureMainCourse: <SignatureMainCourse />,
  SetMenu: <SetMenu />,
  SpecialOrder: <SpecialOrder />,
};

const Menu: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const componentRef = useRef<HTMLDivElement>(null);

  const handleClick = (menu: any) => {
    if (menu.component) {
      setActiveComponent(menu.component);
    }
  };

  useEffect(() => {
    if (activeComponent && componentRef.current) {
      componentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeComponent]);

  return (
    <div className="bg-[#fff9ec] text-[#1b1b1b] font-serif">
      {/* Hero */}
      <div
        className="relative h-[400px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/img/saigon-cyclo.jpg')" }}
      >
        <h1 className="text-white text-6xl md:text-7xl font-bold drop-shadow-lg">Menus</h1>
      </div>

      {/* Description */}
      <div className="text-center max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#2c2c2c] mb-6">A Taste of Saigon</h2>
        <p className="text-lg text-[#3b3b3b] leading-relaxed">
          Discover our menus, where the heart of Saigon comes alive through vibrant Vietnamese dishes designed to delight every palate.
          Whether you’re joining us for breakfast, lunch, or dinner, each plate is a celebration of authentic flavours and fresh ingredients.
        </p>
        <p className="mt-4 text-lg text-[#3b3b3b] leading-relaxed">
          Share the experience with friends and family—from comforting phở to delicate summer rolls and grilled street food classics.
          We recommend three small plates per person for the perfect balance of flavour and discovery.
        </p>
        <div className="border border-[#5b4636] p-3 mt-5 rounded text-xs text-gray-600 bg-white italic">
            <strong className="text-[#5b4636] mb-5">Allergy info ☘</strong>
            <p>
              Please tell us if you have any allergies. We handle nuts, gluten, soy, dairy & shellfish. <br />
              We can’t guarantee dishes are allergen-free.
            </p>
          </div>
      </div>

      

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <h3 className="text-2xl md:text-3xl font-semibold text-center mb-8">Explore Our Menus</h3>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {menus.map((menu) => (
            <div
              key={menu.title}
              onClick={() => handleClick(menu)}
              className="cursor-pointer group block shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div
                className="relative h-64 bg-cover bg-center"
                style={{ backgroundImage: `url(${menu.image})` }}
              >
                <div className="absolute bottom-0 w-full bg-[#1b1b1b]/70 text-white text-center py-3 text-xl font-semibold group-hover:bg-[#1b1b1b]/90 transition-colors duration-300">
                  {menu.title}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Inline Component */}
        <div ref={componentRef} className="mt-12">
          {activeComponent && (
            <div className="max-w-4xl mx-auto">{componentMap[activeComponent]}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
