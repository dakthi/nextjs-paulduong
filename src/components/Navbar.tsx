"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AuthModal } from "./AuthModal";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const navigation = [
    { label: "Tài liệu", href: "/documents" },
    { label: "Về tôi", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Liên hệ", href: "/contact" },
  ];

  return (
    <div className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <img
            src="/img/paul-duong-14.jpg"
            alt="Paul Duong"
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <div className="text-xl font-bold text-gray-900">Paul Duong Canada</div>
            <div className="text-xs text-gray-600">Doanh nhân, luật sư di trú và tác giả</div>
          </div>
        </Link>





        {/* Desktop Nav */}
        <nav className="hidden lg:flex space-x-8 items-center">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition"
            >
              {item.label}
            </Link>
          ))}
          <button 
            onClick={() => setAuthModalOpen(true)}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
          >
            Đăng nhập
          </button>
        </nav>


        {/* Mobile Burger Icon */}
        <button
          className="lg:hidden text-gray-700 transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="lg:hidden px-6 pb-4 pt-2 border-t bg-white border-gray-200 shadow-inner">
          <nav className="space-y-4 text-sm text-gray-700 font-medium">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block hover:text-gray-900 transition"
              >
                {item.label}
              </Link>
            ))}
            <button 
              onClick={() => {
                setMenuOpen(false);
                setAuthModalOpen(true);
              }}
              className="block w-full text-left bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Đăng nhập
            </button>
          </nav>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  );
};
