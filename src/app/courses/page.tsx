"use client";

import { useState } from "react";
import { Container } from "@/components/Container";
import { CourseDownload } from "@/components/CourseDownload";
import { CourseViewer } from "@/components/CourseViewer";
import { AuthModal } from "@/components/AuthModal";

// Mock data for courses
const mockCourses = [
  {
    id: 1,
    title: "Hướng dẫn xin giấy phép du học Canada",
    description: "Hướng dẫn chi tiết từ A-Z về quy trình xin giấy phép du học Canada, các loại giấy tờ cần thiết và kinh nghiệm thực tế.",
    image: "/img/paul-duong-2.jpg",
    price: 3.99,
    duration: "2 giờ 30 phút",
    fileSize: "120 MB",
    format: "PDF + Video",
    isPurchased: false,
    downloadCount: 0,
    maxDownloads: 3
  },
  {
    id: 2,
    title: "Bí quyết hội nhập thành công vào cuộc sống Canada",
    description: "Chia sẻ kinh nghiệm thực tế về cách hội nhập văn hóa, tìm việc làm và xây dựng mạng lưới quan hệ tại Canada.",
    image: "/img/paul-duong-3.jpg",
    price: 4.99,
    duration: "3 giờ 15 phút",
    fileSize: "180 MB",
    format: "Video Course",
    isPurchased: true,
    downloadCount: 1,
    maxDownloads: 5
  },
  {
    id: 3,
    title: "Cẩm nang định cư Canada diện tay nghề",
    description: "Hướng dẫn toàn diện về chương trình định cư diện tay nghề, yêu cầu và quy trình nộp hồ sơ.",
    image: "/img/paul-duong-6.jpg",
    price: 4.99,
    duration: "4 giờ",
    fileSize: "250 MB",
    format: "Complete Package",
    isPurchased: true,
    downloadCount: 2,
    maxDownloads: 3
  }
];

// Mock course data for viewer
const mockCourseForViewer = {
  id: 2,
  title: "Bí quyết hội nhập thành công vào cuộc sống Canada",
  description: "Chia sẻ kinh nghiệm thực tế về cách hội nhập văn hóa, tìm việc làm và xây dựng mạng lưới quan hệ tại Canada.",
  instructor: "Paul Duong",
  totalDuration: "3 giờ 15 phút",
  progress: 65,
  image: "/img/paul-duong-3.jpg",
  modules: [
    {
      id: 1,
      title: "Giới thiệu về cuộc sống Canada",
      duration: "15 phút",
      isCompleted: true,
      type: "video" as const
    },
    {
      id: 2,
      title: "Văn hóa và phong tục Canada",
      duration: "25 phút",
      isCompleted: true,
      type: "video" as const
    },
    {
      id: 3,
      title: "Tìm việc làm hiệu quả",
      duration: "45 phút",
      isCompleted: true,
      type: "video" as const
    },
    {
      id: 4,
      title: "Xây dựng mạng lưới quan hệ",
      duration: "30 phút",
      isCompleted: false,
      type: "video" as const
    },
    {
      id: 5,
      title: "Tài liệu tham khảo",
      duration: "10 phút",
      isCompleted: false,
      type: "document" as const
    }
  ]
};

export default function CoursesPage() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [viewingCourse, setViewingCourse] = useState<number | null>(null);
  const [courses, setCourses] = useState(mockCourses);

  const handleDownload = async (courseId: number) => {
    if (!isSignedIn) {
      setShowAuthModal(true);
      return;
    }

    // Simulate download
    console.log(`Downloading course ${courseId}`);
    
    // Update download count
    setCourses(prev => prev.map(course => 
      course.id === courseId 
        ? { ...course, downloadCount: (course.downloadCount || 0) + 1 }
        : course
    ));
  };

  const handlePurchase = (courseId: number) => {
    if (!isSignedIn) {
      setShowAuthModal(true);
      return;
    }

    // Simulate purchase
    setCourses(prev => prev.map(course => 
      course.id === courseId 
        ? { ...course, isPurchased: true }
        : course
    ));
  };

  const handleViewCourse = (courseId: number) => {
    if (!isSignedIn) {
      setShowAuthModal(true);
      return;
    }
    setViewingCourse(courseId);
  };

  const handleProgress = (moduleId: number, progress: number) => {
    console.log(`Module ${moduleId} progress: ${progress}%`);
  };

  const handleDownloadCertificate = () => {
    console.log("Downloading certificate");
  };

  if (viewingCourse) {
    return (
      <CourseViewer
        course={mockCourseForViewer}
        onProgress={handleProgress}
        onDownloadCertificate={handleDownloadCertificate}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden lg:block w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Danh mục khóa học</h3>
            <nav className="space-y-1">
              <a href="#" className="block px-3 py-2 text-sm text-gray-900 bg-gray-100 rounded-lg">
                Tất cả khóa học
              </a>
              <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                Định cư Canada
              </a>
              <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                Du học
              </a>
              <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                Kinh doanh
              </a>
              <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                Kỹ năng sống
              </a>
            </nav>

            {/* User Status */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              {isSignedIn ? (
                <div>
                  <div className="flex items-center gap-2 text-green-600 text-sm mb-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Đã đăng nhập
                  </div>
                  <button
                    onClick={() => setIsSignedIn(false)}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Đăng xuất
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-600 mb-3">
                    Đăng nhập để truy cập đầy đủ khóa học
                  </p>
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                  >
                    Đăng nhập
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-2 py-2 sm:px-4 sm:py-4 lg:px-8 lg:py-6">
          {/* Header */}
          <div className="mb-4">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              Khóa học của Paul Duong
            </h1>
            <p className="text-gray-600 mb-4">
              Học hỏi từ kinh nghiệm thực tế về định cư Canada, du học và kinh doanh
            </p>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Hiển thị {courses.length} khóa học
              </div>
              <div className="lg:hidden">
                {isSignedIn ? (
                  <div className="flex items-center gap-3">
                    <span className="text-green-600 text-sm">Đã đăng nhập</span>
                    <button
                      onClick={() => setIsSignedIn(false)}
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      Đăng xuất
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                  >
                    Đăng nhập
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="relative">
                <CourseDownload
                  course={course}
                  onDownload={handleDownload}
                  onPurchase={handlePurchase}
                />
                {course.isPurchased && (
                  <button
                    onClick={() => handleViewCourse(course.id)}
                    className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs hover:bg-blue-700 transition"
                  >
                    Xem khóa học
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Call to Action */}
          {!isSignedIn && (
            <div className="mt-8 text-center bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Bắt đầu hành trình học tập của bạn
              </h3>
              <p className="text-gray-600 mb-4">
                Đăng nhập để trải nghiệm đầy đủ các khóa học và tải xuống tài liệu
              </p>
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Đăng nhập ngay
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="login"
      />
    </div>
  );
}