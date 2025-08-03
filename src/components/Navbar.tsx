"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Menu, X, User, LogOut } from "lucide-react";
import { AuthModal } from "./AuthModal";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const navigation = [
    { label: "Khóa học", href: "/courses" },
    { label: "Tài liệu", href: "/documents" },
    { label: "Về tôi", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Liên hệ", href: "/contact" },
    { label: "Admin", href: "/admin" },
  ];

  return (
    <div className="w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <img
            src="/img/paul-duong-14.jpg"
            alt="Paul Duong"
            className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-gray-300 transition-all"
          />
          <div>
            <div className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">Paul Duong Canada</div>
            <div className="text-xs text-gray-600">Doanh nhân, luật sư di trú và tác giả</div>
          </div>
        </Link>





        {/* Desktop Nav */}
        <nav className="hidden lg:flex space-x-8 items-center">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all"
            >
              {item.label}
            </Link>
          ))}
          
          {session ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition"
              >
                <User size={20} />
                <span>{session.user.name || session.user.email}</span>
              </button>
              
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 backdrop-blur-sm">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg mx-2 transition-colors"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  {session.user.role === "ADMIN" && (
                    <Link
                      href="/admin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg mx-2 transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <hr className="my-2" />
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      signOut();
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg mx-2 transition-colors"
                  >
                    <LogOut size={16} className="inline mr-2" />
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={() => setAuthModalOpen(true)}
              className="bg-gray-900 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl"
            >
              Đăng nhập
            </button>
          )}
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
        <div className="lg:hidden px-6 pb-4 pt-2 border-t bg-white/95 backdrop-blur-sm border-gray-200 shadow-inner">
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
            
            {session ? (
              <div className="space-y-2 pt-2 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-gray-900 font-medium">
                  <User size={16} />
                  <span>{session.user.name || session.user.email}</span>
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="block hover:text-gray-900 transition"
                >
                  Dashboard
                </Link>
                {session.user.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="block hover:text-gray-900 transition"
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    signOut();
                  }}
                  className="block w-full text-left text-red-600 hover:text-red-800 transition"
                >
                  <LogOut size={16} className="inline mr-2" />
                  Đăng xuất
                </button>
              </div>
            ) : (
              <button 
                onClick={() => {
                  setMenuOpen(false);
                  setAuthModalOpen(true);
                }}
                className="block w-full text-left bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-all font-semibold shadow-lg"
              >
                Đăng nhập
              </button>
            )}
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
