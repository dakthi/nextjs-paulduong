"use client";

import Link from "next/link";

export function Footer() {
  const navigation = [
    { label: "Tài liệu", href: "/documents" },
    { label: "Về tôi", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Liên hệ", href: "/contact" },
  ];

  const legal = [
    { label: "Điều khoản", href: "/terms" },
    { label: "Bảo mật", href: "/privacy" },
  ];

  const services = [
    "Tư vấn định cư Canada",
    "Hướng dẫn du học",
    "Tư vấn kinh doanh",
    "Coaching cá nhân"
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <img
                src="/img/paul-duong-1.jpg"
                alt="Paul Duong"
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <div className="text-xl font-bold text-white">Paul Duong</div>
                <div className="text-xs text-gray-400">Canada</div>
              </div>
            </Link>
            <p className="text-gray-300 leading-relaxed mb-6">
              Chia sẻ kinh nghiệm và kiến thức về định cư Canada, kinh doanh và phát triển cá nhân.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/paulduongcanada" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-400 transition" aria-label="Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C8.396 0 7.989.013 7.041.048 6.094.084 5.52.199 5.012.376c-.526.181-1.017.433-1.481.896C2.99 1.813 2.738 2.304 2.557 2.83c-.177.508-.292 1.082-.328 2.029C2.194 5.807 2.181 6.214 2.181 9.835v4.33c0 3.621.013 4.028.048 4.976.036.947.151 1.521.328 2.029.181.526.433 1.017.896 1.481.464.464.955.715 1.481.896.508.177 1.082.292 2.029.328.948.035 1.355.048 4.976.048h4.33c3.621 0 4.028-.013 4.976-.048.947-.036 1.521-.151 2.029-.328.526-.181 1.017-.433 1.481-.896.464-.464.715-.955.896-1.481.177-.508.292-1.082.328-2.029.035-.948.048-1.355.048-4.976v-4.33c0-3.621-.013-4.028-.048-4.976-.036-.947-.151-1.521-.328-2.029-.181-.526-.433-1.017-.896-1.481C19.555.847 19.064.595 18.538.414c-.508-.177-1.082-.292-2.029-.328C15.561.051 15.154.038 11.533.038h-.516zm-.056 2.184h.516c3.506 0 3.923.016 5.3.048.945.035 1.458.161 1.8.267.452.176.775.386 1.113.724.338.338.548.661.724 1.113.106.342.232.855.267 1.8.032 1.377.039 1.794.039 5.3s-.007 3.923-.039 5.3c-.035.945-.161 1.458-.267 1.8-.176.452-.386.775-.724 1.113-.338.338-.661.548-1.113.724-.342.106-.855.232-1.8.267-1.377.032-1.794.039-5.3.039s-3.923-.007-5.3-.039c-.945-.035-1.458-.161-1.8-.267-.452-.176-.775-.386-1.113-.724-.338-.338-.548-.661-.724-1.113-.106-.342-.232-.855-.267-1.8-.032-1.377-.039-1.794-.039-5.3s.007-3.923.039-5.3c.035-.945.161-1.458.267-1.8.176-.452.386-.775.724-1.113.338-.338.661-.548 1.113-.724.342-.106.855-.232 1.8-.267 1.205-.027 1.671-.035 4.284-.035l.017 2.165zm8.683 2.016c-.87 0-1.576-.706-1.576-1.576s.706-1.576 1.576-1.576 1.576.706 1.576 1.576-.706 1.576-1.576 1.576zM12.017 5.838c-3.394 0-6.145 2.751-6.145 6.145s2.751 6.145 6.145 6.145 6.145-2.751 6.145-6.145-2.751-6.145-6.145-6.145zm0 2.452c2.02 0 3.693 1.673 3.693 3.693s-1.673 3.693-3.693 3.693-3.693-1.673-3.693-3.693 1.673-3.693 3.693-3.693z"/>
                </svg>
              </a>
              <a href="https://youtube.com/@paulduongcanada" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-400 transition" aria-label="YouTube">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="https://tiktok.com/@paulduongcanada" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition" aria-label="TikTok">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.321 5.562c-.756-.756-1.283-1.834-1.438-3.062-.07-.562-.105-1.045-.105-1.5h-3.765v11.695c0 1.754-1.249 3.18-2.783 3.18-1.534 0-2.783-1.426-2.783-3.18 0-1.754 1.249-3.18 2.783-3.18.258 0 .507.035.745.1V6.03c-3.708 0-6.72 3.042-6.72 6.781s3.012 6.782 6.72 6.782c3.708 0 6.72-3.043 6.72-6.782V8.84c1.534 1.17 3.465 1.863 5.566 1.863V7.368c-1.283 0-2.439-.492-3.32-1.296-.264-.24-.498-.51-.698-.81z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4">Khám phá</h4>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-blue-400 transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Dịch vụ</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service} className="text-gray-300">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Liên hệ</h4>
            <div className="space-y-3 mb-6">
              <p className="text-gray-300">
                duongtp08@gmail.com
              </p>
              <p className="text-gray-300">
                Campbell Group
              </p>
              <p className="text-gray-300">
                Canada
              </p>
            </div>
            
            <h5 className="text-white font-medium mb-3">Pháp lý</h5>
            <ul className="space-y-2">
              {legal.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Paul Duong. Tất cả quyền được bảo lưu.
            </div>
            <div className="flex space-x-6 text-sm">
              <span className="text-gray-400">Tiếng Việt</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-400">Made in Canada</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
