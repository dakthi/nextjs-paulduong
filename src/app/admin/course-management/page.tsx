"use client";

import { useState } from "react";
import { CourseManagementLayout } from "@/components/CourseManagementLayout";
import { CourseEditor } from "@/components/CourseEditor";
import { StudentManagement } from "@/components/StudentManagement";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye,
  BookOpen,
  Users,
  DollarSign,
  TrendingUp,
  Download,
  Settings
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  category: string;
  level: string;
  duration: string;
  image: string;
  modules: any[];
  isPublished: boolean;
  maxDownloads: number;
  students?: number;
  revenue?: number;
  rating?: number;
  createdAt?: string;
}

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Hướng dẫn xin giấy phép du học Canada",
    description: "Hướng dẫn chi tiết từ A-Z về quy trình xin giấy phép du học Canada...",
    shortDescription: "Hướng dẫn chi tiết về quy trình xin giấy phép du học Canada",
    price: 3.99,
    category: "study",
    level: "beginner",
    duration: "2 giờ 30 phút",
    image: "/img/paul-duong-2.jpg",
    modules: [],
    isPublished: true,
    maxDownloads: 3,
    students: 89,
    revenue: 355.11,
    rating: 4.8,
    createdAt: "2023-10-15"
  },
  {
    id: "2",
    title: "Bí quyết hội nhập thành công vào cuộc sống Canada",
    description: "Chia sẻ kinh nghiệm thực tế về cách hội nhập văn hóa...",
    shortDescription: "Kinh nghiệm hội nhập văn hóa và tìm việc làm tại Canada",
    price: 4.99,
    category: "life-skills",
    level: "intermediate",
    duration: "3 giờ 15 phút",
    image: "/img/paul-duong-3.jpg",
    modules: [],
    isPublished: true,
    maxDownloads: 5,
    students: 67,
    revenue: 334.33,
    rating: 4.9,
    createdAt: "2023-11-01"
  },
  {
    id: "3",
    title: "Cẩm nang định cư Canada diện tay nghề",
    description: "Hướng dẫn toàn diện về chương trình định cư diện tay nghề...",
    shortDescription: "Hướng dẫn định cư Canada diện tay nghề",
    price: 4.99,
    category: "immigration",
    level: "advanced",
    duration: "4 giờ",
    image: "/img/paul-duong-6.jpg",
    modules: [],
    isPublished: true,
    maxDownloads: 3,
    students: 54,
    revenue: 269.46,
    rating: 4.7,
    createdAt: "2023-09-20"
  }
];

export default function CourseManagementPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [courses, setCourses] = useState(mockCourses);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [showCourseEditor, setShowCourseEditor] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleCreateCourse = () => {
    setEditingCourse(null);
    setShowCourseEditor(true);
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setShowCourseEditor(true);
  };

  const handleSaveCourse = (courseData: Course) => {
    if (editingCourse) {
      // Update existing course
      setCourses(prev => prev.map(c => 
        c.id === editingCourse.id ? { ...courseData, id: editingCourse.id } : c
      ));
    } else {
      // Create new course
      const newCourse = {
        ...courseData,
        id: Date.now().toString(),
        students: 0,
        revenue: 0,
        rating: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setCourses(prev => [...prev, newCourse]);
    }
    setShowCourseEditor(false);
    setEditingCourse(null);
  };

  const handleDeleteCourse = (courseId: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa khóa học này?")) {
      setCourses(prev => prev.filter(c => c.id !== courseId));
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "published" && course.isPublished) ||
      (statusFilter === "draft" && !course.isPublished);
    return matchesSearch && matchesStatus;
  });

  const getCategoryLabel = (category: string) => {
    const categories = {
      "immigration": "Định cư Canada",
      "study": "Du học",
      "business": "Kinh doanh",
      "life-skills": "Kỹ năng sống"
    };
    return categories[category as keyof typeof categories] || category;
  };

  const getLevelLabel = (level: string) => {
    const levels = {
      "beginner": "Cơ bản",
      "intermediate": "Trung cấp",
      "advanced": "Nâng cao"
    };
    return levels[level as keyof typeof levels] || level;
  };

  if (showCourseEditor) {
    return (
      <CourseManagementLayout activeTab={activeTab} onTabChange={setActiveTab}>
        <CourseEditor
          course={editingCourse || undefined}
          onSave={handleSaveCourse}
          onCancel={() => {
            setShowCourseEditor(false);
            setEditingCourse(null);
          }}
        />
      </CourseManagementLayout>
    );
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tổng khóa học</p>
              <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tổng học viên</p>
              <p className="text-2xl font-bold text-gray-900">
                {courses.reduce((sum, c) => sum + (c.students || 0), 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tổng doanh thu</p>
              <p className="text-2xl font-bold text-gray-900">
                ${courses.reduce((sum, c) => sum + (c.revenue || 0), 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-orange-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Đánh giá TB</p>
              <p className="text-2xl font-bold text-gray-900">
                {courses.length > 0 ? (courses.reduce((sum, c) => sum + (c.rating || 0), 0) / courses.length).toFixed(1) : "0.0"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={handleCreateCourse}
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            <Plus className="text-blue-600" size={24} />
            <div className="text-left">
              <div className="font-medium text-gray-900">Tạo khóa học mới</div>
              <div className="text-sm text-gray-600">Thêm khóa học vào danh mục</div>
            </div>
          </button>
          
          <button
            onClick={() => setActiveTab("students")}
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            <Users className="text-green-600" size={24} />
            <div className="text-left">
              <div className="font-medium text-gray-900">Quản lý học viên</div>
              <div className="text-sm text-gray-600">Xem danh sách học viên</div>
            </div>
          </button>
          
          <button
            onClick={() => setActiveTab("analytics")}
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            <TrendingUp className="text-purple-600" size={24} />
            <div className="text-left">
              <div className="font-medium text-gray-900">Xem báo cáo</div>
              <div className="text-sm text-gray-600">Phân tích hiệu suất</div>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Courses */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Khóa học gần đây</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.slice(0, 3).map((course) => (
              <div key={course.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <img 
                  src={course.image}
                  alt={course.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
                    {course.title}
                  </h4>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span>{course.students || 0} học viên</span>
                    <span>${course.price}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditCourse(course)}
                      className="flex-1 text-sm bg-blue-600 text-white py-2 px-3 rounded hover:bg-blue-700"
                    >
                      Chỉnh sửa
                    </button>
                    <button className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50">
                      <Eye size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý khóa học</h1>
          <p className="text-gray-600 mt-1">Tạo và quản lý nội dung khóa học</p>
        </div>
        <button
          onClick={handleCreateCourse}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={16} />
          Tạo khóa học
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Tìm kiếm khóa học..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Tất cả</option>
            <option value="published">Đã xuất bản</option>
            <option value="draft">Bản nháp</option>
          </select>
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Khóa học</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Danh mục</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Giá</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Học viên</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doanh thu</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{course.title}</div>
                        <div className="text-sm text-gray-500">{course.duration}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {getCategoryLabel(course.category)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">${course.price}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{course.students || 0}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">${(course.revenue || 0).toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      course.isPublished 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {course.isPublished ? "Đã xuất bản" : "Bản nháp"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditCourse(course)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit size={16} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard();
      case "courses":
        return renderCourses();
      case "students":
        return <StudentManagement />;
      case "analytics":
        return <AnalyticsDashboard />;
      default:
        return renderDashboard();
    }
  };

  return (
    <CourseManagementLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </CourseManagementLayout>
  );
}