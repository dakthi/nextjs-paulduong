"use client";

import { useState } from "react";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Phone, 
  MapPin,
  BookOpen,
  Calendar,
  DollarSign,
  Download,
  Ban,
  UserCheck,
  Edit,
  Trash2,
  Eye,
  MessageCircle
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  avatar?: string;
  joinDate: string;
  status: "active" | "inactive" | "banned";
  totalPurchases: number;
  totalSpent: number;
  lastActivity: string;
  enrolledCourses: {
    id: string;
    title: string;
    progress: number;
    enrollDate: string;
    status: "in-progress" | "completed" | "not-started";
  }[];
}

const mockStudents: Student[] = [
  {
    id: "1",
    name: "Nguyễn Văn An",
    email: "nguyen.van.an@email.com",
    phone: "+1 647-123-4567",
    location: "Toronto, Canada",
    avatar: "/img/Sample_User_Icon.png",
    joinDate: "2023-10-15",
    status: "active",
    totalPurchases: 3,
    totalSpent: 14.97,
    lastActivity: "2 giờ trước",
    enrolledCourses: [
      {
        id: "1",
        title: "Hướng dẫn xin giấy phép du học Canada",
        progress: 100,
        enrollDate: "2023-12-15",
        status: "completed"
      },
      {
        id: "2",
        title: "Bí quyết hội nhập thành công",
        progress: 65,
        enrollDate: "2023-12-10",
        status: "in-progress"
      }
    ]
  },
  {
    id: "2",
    name: "Trần Thị Bình",
    email: "tran.thi.binh@email.com",
    phone: "+1 416-987-6543",
    location: "Vancouver, Canada",
    joinDate: "2023-11-20",
    status: "active",
    totalPurchases: 2,
    totalSpent: 9.98,
    lastActivity: "1 ngày trước",
    enrolledCourses: [
      {
        id: "3",
        title: "Cẩm nang định cư Canada",
        progress: 45,
        enrollDate: "2023-12-05",
        status: "in-progress"
      }
    ]
  },
  {
    id: "3",
    name: "Lê Minh Cường",
    email: "le.minh.cuong@email.com",
    location: "Calgary, Canada",
    joinDate: "2023-09-10",
    status: "inactive",
    totalPurchases: 1,
    totalSpent: 3.99,
    lastActivity: "2 tuần trước",
    enrolledCourses: [
      {
        id: "1",
        title: "Hướng dẫn xin giấy phép du học Canada",
        progress: 15,
        enrollDate: "2023-11-01",
        status: "not-started"
      }
    ]
  }
];

export function StudentManagement() {
  const [students, setStudents] = useState(mockStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showStudentModal, setShowStudentModal] = useState(false);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-yellow-100 text-yellow-800";
      case "banned": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active": return "Hoạt động";
      case "inactive": return "Không hoạt động";
      case "banned": return "Bị cấm";
      default: return status;
    }
  };

  const getCourseStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "not-started": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCourseStatusLabel = (status: string) => {
    switch (status) {
      case "completed": return "Hoàn thành";
      case "in-progress": return "Đang học";
      case "not-started": return "Chưa bắt đầu";
      default: return status;
    }
  };

  const viewStudentDetails = (student: Student) => {
    setSelectedStudent(student);
    setShowStudentModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý học viên</h1>
          <p className="text-gray-600 mt-1">
            Theo dõi và quản lý thông tin học viên
          </p>
        </div>
        <div className="text-sm text-gray-600">
          Tổng cộng: {students.length} học viên
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tổng học viên</p>
              <p className="text-2xl font-bold text-gray-900">{students.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <UserCheck className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Đang hoạt động</p>
              <p className="text-2xl font-bold text-gray-900">
                {students.filter(s => s.status === "active").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="text-purple-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tổng doanh thu</p>
              <p className="text-2xl font-bold text-gray-900">
                ${students.reduce((sum, s) => sum + s.totalSpent, 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="text-orange-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Mới trong tháng</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Hoạt động</option>
              <option value="inactive">Không hoạt động</option>
              <option value="banned">Bị cấm</option>
            </select>
            
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter size={16} />
              Bộ lọc
            </button>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Học viên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Liên hệ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khóa học
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Chi tiêu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hoạt động cuối
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={student.avatar || "/img/Sample_User_Icon.png"}
                        alt={student.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {student.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          Tham gia: {new Date(student.joinDate).toLocaleDateString('vi-VN')}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.email}</div>
                    {student.phone && (
                      <div className="text-sm text-gray-500">{student.phone}</div>
                    )}
                    {student.location && (
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <MapPin size={12} />
                        {student.location}
                      </div>
                    )}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                      {getStatusLabel(student.status)}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {student.enrolledCourses.length} khóa học
                    </div>
                    <div className="text-sm text-gray-500">
                      {student.enrolledCourses.filter(c => c.status === "completed").length} hoàn thành
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${student.totalSpent.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {student.totalPurchases} giao dịch
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.lastActivity}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => viewStudentDetails(student)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye size={16} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <MessageCircle size={16} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Details Modal */}
      {showStudentModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Chi tiết học viên
              </h2>
              <button
                onClick={() => setShowStudentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Student Info */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <img
                      src={selectedStudent.avatar || "/img/Sample_User_Icon.png"}
                      alt={selectedStudent.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {selectedStudent.name}
                    </h3>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedStudent.status)}`}>
                      {getStatusLabel(selectedStudent.status)}
                    </span>
                    
                    <div className="mt-6 space-y-3 text-left">
                      <div className="flex items-center gap-3">
                        <Mail size={16} className="text-gray-400" />
                        <span className="text-sm text-gray-600">{selectedStudent.email}</span>
                      </div>
                      {selectedStudent.phone && (
                        <div className="flex items-center gap-3">
                          <Phone size={16} className="text-gray-400" />
                          <span className="text-sm text-gray-600">{selectedStudent.phone}</span>
                        </div>
                      )}
                      {selectedStudent.location && (
                        <div className="flex items-center gap-3">
                          <MapPin size={16} className="text-gray-400" />
                          <span className="text-sm text-gray-600">{selectedStudent.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Course Progress */}
                <div className="lg:col-span-2">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Khóa học đã đăng ký
                  </h4>
                  <div className="space-y-4">
                    {selectedStudent.enrolledCourses.map((course) => (
                      <div key={course.id} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-medium text-gray-900">{course.title}</h5>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCourseStatusColor(course.status)}`}>
                            {getCourseStatusLabel(course.status)}
                          </span>
                        </div>
                        
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                            <span>Tiến độ</span>
                            <span>{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-600">
                          Đăng ký: {new Date(course.enrollDate).toLocaleDateString('vi-VN')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}