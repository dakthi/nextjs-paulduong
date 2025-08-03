"use client";

import { useState } from "react";
import { 
  BookOpen, 
  Users, 
  BarChart3, 
  Settings, 
  Plus,
  Search,
  Bell,
  User,
  Menu,
  X,
  Home,
  FileText,
  DollarSign
} from "lucide-react";

interface CourseManagementLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigationItems = [
  { id: "dashboard", label: "Tổng quan", icon: Home },
  { id: "courses", label: "Khóa học", icon: BookOpen },
  { id: "students", label: "Học viên", icon: Users },
  { id: "content", label: "Nội dung", icon: FileText },
  { id: "analytics", label: "Báo cáo", icon: BarChart3 },
  { id: "revenue", label: "Doanh thu", icon: DollarSign },
  { id: "settings", label: "Cài đặt", icon: Settings },
];

export function CourseManagementLayout({ children, activeTab, onTabChange }: CourseManagementLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <img
              src="/img/paul-duong-1.jpg"
              alt="Paul Duong"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <div className="font-semibold text-gray-900">Paul Duong</div>
              <div className="text-xs text-gray-500">Admin Panel</div>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-6 px-3">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors mb-1
                  ${activeTab === item.id 
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Quick Actions */}
        <div className="mt-8 px-3">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            Thao tác nhanh
          </div>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <Plus size={16} />
            Tạo khóa học mới
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-400 hover:text-gray-600"
              >
                <Menu size={20} />
              </button>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Tìm kiếm khóa học, học viên..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile */}
              <div className="flex items-center gap-3">
                <img
                  src="/img/paul-duong-1.jpg"
                  alt="Paul Duong"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="hidden md:block">
                  <div className="text-sm font-medium text-gray-900">Paul Duong</div>
                  <div className="text-xs text-gray-500">Administrator</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="px-2 py-2 sm:px-4 sm:py-4 lg:px-6 lg:py-6">
          {children}
        </main>
      </div>
    </div>
  );
}