"use client";

import { useState } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  BookOpen, 
  DollarSign, 
  Download,
  Calendar,
  Filter,
  FileDown,
  Eye,
  BarChart3,
  PieChart
} from "lucide-react";

interface AnalyticsData {
  revenue: {
    current: number;
    previous: number;
    change: number;
  };
  students: {
    total: number;
    new: number;
    active: number;
    change: number;
  };
  courses: {
    total: number;
    published: number;
    mostPopular: string;
    completionRate: number;
  };
  downloads: {
    total: number;
    thisMonth: number;
    change: number;
  };
}

const mockAnalytics: AnalyticsData = {
  revenue: {
    current: 2847.50,
    previous: 2234.75,
    change: 27.4
  },
  students: {
    total: 156,
    new: 23,
    active: 134,
    change: 15.8
  },
  courses: {
    total: 8,
    published: 6,
    mostPopular: "Hướng dẫn xin giấy phép du học Canada",
    completionRate: 78.5
  },
  downloads: {
    total: 342,
    thisMonth: 89,
    change: 12.3
  }
};

const monthlyRevenueData = [
  { month: "T1", revenue: 1200, students: 45 },
  { month: "T2", revenue: 1350, students: 52 },
  { month: "T3", revenue: 1580, students: 48 },
  { month: "T4", revenue: 1420, students: 55 },
  { month: "T5", revenue: 1890, students: 62 },
  { month: "T6", revenue: 2100, students: 58 },
  { month: "T7", revenue: 2400, students: 71 },
  { month: "T8", revenue: 2650, students: 68 },
  { month: "T9", revenue: 2340, students: 74 },
  { month: "T10", revenue: 2580, students: 82 },
  { month: "T11", revenue: 2750, students: 89 },
  { month: "T12", revenue: 2847, students: 94 }
];

const topCourses = [
  { 
    title: "Hướng dẫn xin giấy phép du học Canada", 
    students: 89, 
    revenue: 355.11, 
    rating: 4.8,
    completion: 85 
  },
  { 
    title: "Bí quyết hội nhập thành công vào cuộc sống Canada", 
    students: 67, 
    revenue: 334.33, 
    rating: 4.9,
    completion: 72 
  },
  { 
    title: "Cẩm nang định cư Canada diện tay nghề", 
    students: 54, 
    revenue: 269.46, 
    rating: 4.7,
    completion: 68 
  },
  { 
    title: "Khởi nghiệp thành công tại Canada", 
    students: 43, 
    revenue: 215.57, 
    rating: 4.6,
    completion: 59 
  }
];

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("thisMonth");
  const [chartType, setChartType] = useState("revenue");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getChangeIcon = (change: number) => {
    return change > 0 ? <TrendingUp size={16} className="text-green-500" /> : <TrendingDown size={16} className="text-red-500" />;
  };

  const getChangeColor = (change: number) => {
    return change > 0 ? "text-green-600" : "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Phân tích & Báo cáo</h1>
          <p className="text-gray-600 mt-1">
            Theo dõi hiệu suất và xu hướng kinh doanh
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="thisWeek">Tuần này</option>
            <option value="thisMonth">Tháng này</option>
            <option value="thisQuarter">Quý này</option>
            <option value="thisYear">Năm này</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <FileDown size={16} />
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Doanh thu</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(mockAnalytics.revenue.current)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="text-green-600" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            {getChangeIcon(mockAnalytics.revenue.change)}
            <span className={`text-sm font-medium ${getChangeColor(mockAnalytics.revenue.change)}`}>
              {mockAnalytics.revenue.change > 0 ? '+' : ''}{mockAnalytics.revenue.change}%
            </span>
            <span className="text-sm text-gray-600">so với tháng trước</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Học viên</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockAnalytics.students.total}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="text-blue-600" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            {getChangeIcon(mockAnalytics.students.change)}
            <span className={`text-sm font-medium ${getChangeColor(mockAnalytics.students.change)}`}>
              {mockAnalytics.students.change > 0 ? '+' : ''}{mockAnalytics.students.change}%
            </span>
            <span className="text-sm text-gray-600">{mockAnalytics.students.new} mới</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Khóa học</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockAnalytics.courses.published}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BookOpen className="text-purple-600" size={24} />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-sm text-gray-600">
              Tỷ lệ hoàn thành: <span className="font-medium text-gray-900">{mockAnalytics.courses.completionRate}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Lượt tải xuống</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockAnalytics.downloads.thisMonth}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Download className="text-orange-600" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            {getChangeIcon(mockAnalytics.downloads.change)}
            <span className={`text-sm font-medium ${getChangeColor(mockAnalytics.downloads.change)}`}>
              {mockAnalytics.downloads.change > 0 ? '+' : ''}{mockAnalytics.downloads.change}%
            </span>
            <span className="text-sm text-gray-600">tháng này</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Doanh thu theo tháng</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setChartType("revenue")}
                className={`px-3 py-1 text-sm rounded-md ${
                  chartType === "revenue" 
                    ? "bg-blue-100 text-blue-700" 
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Doanh thu
              </button>
              <button
                onClick={() => setChartType("students")}
                className={`px-3 py-1 text-sm rounded-md ${
                  chartType === "students" 
                    ? "bg-blue-100 text-blue-700" 
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Học viên
              </button>
            </div>
          </div>
          
          {/* Simple Bar Chart */}
          <div className="space-y-3">
            {monthlyRevenueData.slice(-6).map((data, index) => {
              const value = chartType === "revenue" ? data.revenue : data.students;
              const maxValue = chartType === "revenue" ? 3000 : 100;
              const percentage = (value / maxValue) * 100;
              
              return (
                <div key={data.month} className="flex items-center gap-3">
                  <span className="w-8 text-sm text-gray-600">{data.month}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
                    <div 
                      className="bg-blue-600 h-4 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="w-16 text-sm text-gray-900 text-right">
                    {chartType === "revenue" ? formatCurrency(value) : `${value}`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Courses */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Khóa học phổ biến</h3>
          <div className="space-y-4">
            {topCourses.map((course, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm leading-tight mb-2">
                    {course.title}
                  </h4>
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                      <Users size={12} />
                      {course.students} học viên
                    </span>
                    <span>★ {course.rating}</span>
                    <span>{course.completion}% hoàn thành</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">
                    {formatCurrency(course.revenue)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Hoạt động gần đây</h3>
          <div className="space-y-4">
            {[
              { action: "Học viên mới đăng ký", user: "Nguyễn Văn An", time: "2 phút trước", type: "user" },
              { action: "Khóa học được mua", course: "Hướng dẫn du học Canada", time: "5 phút trước", type: "purchase" },
              { action: "Khóa học hoàn thành", user: "Trần Thị Bình", time: "15 phút trước", type: "completion" },
              { action: "Đánh giá mới", course: "Bí quyết hội nhập", rating: 5, time: "1 giờ trước", type: "review" },
              { action: "Tài liệu được tải xuống", user: "Lê Minh Cường", time: "2 giờ trước", type: "download" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.type === "user" ? "bg-blue-100" :
                  activity.type === "purchase" ? "bg-green-100" :
                  activity.type === "completion" ? "bg-purple-100" :
                  activity.type === "review" ? "bg-yellow-100" :
                  "bg-gray-100"
                }`}>
                  {activity.type === "user" && <Users size={16} className="text-blue-600" />}
                  {activity.type === "purchase" && <DollarSign size={16} className="text-green-600" />}
                  {activity.type === "completion" && <BookOpen size={16} className="text-purple-600" />}
                  {activity.type === "review" && <span className="text-yellow-600">★</span>}
                  {activity.type === "download" && <Download size={16} className="text-gray-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    {activity.action}
                    {activity.user && <span className="font-medium"> {activity.user}</span>}
                    {activity.course && <span className="font-medium"> "{activity.course}"</span>}
                    {activity.rating && <span className="font-medium"> {activity.rating} sao</span>}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Goals & Targets */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Mục tiêu tháng này</h3>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Doanh thu</span>
                <span className="text-sm font-medium">$2,847 / $3,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "94.9%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Học viên mới</span>
                <span className="text-sm font-medium">23 / 30</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "76.7%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Tỷ lệ hoàn thành khóa học</span>
                <span className="text-sm font-medium">78.5% / 80%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: "98.1%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Khóa học mới</span>
                <span className="text-sm font-medium">1 / 2</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: "50%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}