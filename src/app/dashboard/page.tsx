"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Container } from "@/components/Container";
import { Download, Eye, Calendar, DollarSign, FileText, Settings, Bell, LogOut, User, TrendingUp } from "lucide-react";

// Mock user data
const userData = {
  name: "Nguyễn Văn An",
  email: "nguyen.van.an@email.com",
  joinDate: "Tháng 10, 2023",
  totalPurchases: 3,
  totalSpent: 14.97
};

// Mock purchased documents
const purchasedDocuments = [
  {
    id: 1,
    title: "Hướng dẫn xin giấy phép du học Canada",
    price: 3.99,
    purchaseDate: "15/12/2023",
    status: "completed",
    image: "/img/paul-duong-2.jpg"
  },
  {
    id: 2,
    title: "Bí quyết hội nhập thành công vào cuộc sống Canada", 
    price: 4.99,
    purchaseDate: "10/12/2023",
    status: "completed",
    image: "/img/paul-duong-3.jpg"
  },
  {
    id: 3,
    title: "Cẩm nang định cư Canada diện tay nghề dành cho người Việt Nam",
    price: 4.99,
    purchaseDate: "05/12/2023", 
    status: "completed",
    image: "/img/paul-duong-6.jpg"
  }
];

export default function DashboardPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('documents');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Đang tải dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden lg:block w-72 bg-white shadow-xl border-r border-gray-200 min-h-screen">
          <div className="p-6">
            {/* Profile Info */}
            <div className="text-center mb-8">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-white">
                    {session?.user?.name?.charAt(0) || userData.name.charAt(0)}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">
                {session?.user?.name || userData.name}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                {session?.user?.email || userData.email}
              </p>
              <p className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full inline-block">
                Tham gia từ {userData.joinDate}
              </p>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 mb-8">
              <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Thống kê
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-700">Tài liệu đã mua:</span>
                  <span className="font-bold text-blue-900 bg-white px-2 py-1 rounded-lg">{userData.totalPurchases}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-700">Tổng chi tiêu:</span>
                  <span className="font-bold text-blue-900 bg-white px-2 py-1 rounded-lg">${userData.totalSpent}</span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              <button 
                onClick={() => setActiveTab('documents')}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                  activeTab === 'documents' 
                    ? 'bg-gray-900 text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FileText className="w-4 h-4" />
                Tài liệu của tôi
              </button>
              <button 
                onClick={() => setActiveTab('history')}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                  activeTab === 'history' 
                    ? 'bg-gray-900 text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Calendar className="w-4 h-4" />
                Lịch sử mua hàng
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                  activeTab === 'settings' 
                    ? 'bg-gray-900 text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Settings className="w-4 h-4" />
                Cài đặt
              </button>
              <button 
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                  activeTab === 'notifications' 
                    ? 'bg-gray-900 text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Bell className="w-4 h-4" />
                Thông báo
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">3</span>
              </button>
            </nav>

            <button className="w-full mt-8 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-red-600 border-2 border-red-200 rounded-xl hover:bg-red-50 hover:border-red-300 transition-all">
              <LogOut className="w-4 h-4" />
              Đăng xuất
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4 py-6 lg:px-8 lg:py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Chào mừng trở lại!
              </h1>
              <div className="lg:hidden">
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <User className="w-6 h-6" />
                </button>
              </div>
            </div>
            <p className="text-gray-600 text-lg">
              Quản lý tài khoản và tài liệu của bạn
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full font-medium">
                  +2 tuần này
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {userData.totalPurchases}
              </div>
              <p className="text-gray-600 font-medium">Tài liệu đã mua</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Download className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded-full font-medium">
                  100%
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {purchasedDocuments.filter(doc => doc.status === 'completed').length}
              </div>
              <p className="text-gray-600 font-medium">Đã tải xuống</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded-full font-medium">
                  Tiết kiệm 40%
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                ${userData.totalSpent}
              </div>
              <p className="text-gray-600 font-medium">Tổng chi tiêu</p>
            </div>
          </div>

          {/* My Documents */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Tài liệu của tôi
              </h2>
              <a href="/documents" className="text-sm text-blue-600 hover:text-blue-700">
                Xem tất cả →
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {purchasedDocuments.map((doc) => (
                <div key={doc.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow">
                  <img 
                    src={doc.image}
                    alt={doc.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 text-sm">
                      {doc.title}
                    </h3>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600">
                        ${doc.price}
                      </span>
                      <span className="text-xs text-gray-500">
                        {doc.purchaseDate}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-xs hover:bg-blue-700 transition">
                        Tải xuống
                      </button>
                      <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded text-xs hover:bg-gray-50 transition">
                        Xem
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Hoạt động gần đây
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="divide-y divide-gray-200">
                {purchasedDocuments.map((doc, index) => (
                  <div key={index} className="p-4 flex items-center gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 text-sm">📄</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Đã mua "{doc.title}"
                      </p>
                      <p className="text-xs text-gray-600">
                        {doc.purchaseDate}
                      </p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      ${doc.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}