"use client";

import { useState } from "react";
import { 
  Save, 
  Upload, 
  Plus, 
  Trash2, 
  Eye, 
  Edit3,
  Image,
  Video,
  FileText
} from "lucide-react";

interface Module {
  id: string;
  title: string;
  type: "video" | "document" | "quiz";
  duration: string;
  content?: string;
  order: number;
}

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
  modules: Module[];
  isPublished: boolean;
  maxDownloads: number;
  students?: number;
  revenue?: number;
  rating?: number;
  createdAt?: string;
}

interface CourseEditorProps {
  course?: Course;
  onSave: (course: Course) => void;
  onCancel: () => void;
}

export function CourseEditor({ course, onSave, onCancel }: CourseEditorProps) {
  const [formData, setFormData] = useState<Course>(course || {
    id: "",
    title: "",
    description: "",
    shortDescription: "",
    price: 0,
    category: "",
    level: "beginner",
    duration: "",
    image: "",
    modules: [],
    isPublished: false,
    maxDownloads: 3,
    students: 0,
    revenue: 0,
    rating: 0,
    createdAt: ""
  });

  const [activeTab, setActiveTab] = useState("basic");
  const [newModule, setNewModule] = useState({ title: "", type: "video", duration: "" });

  const handleInputChange = (field: keyof Course, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addModule = () => {
    if (!newModule.title.trim()) return;
    
    const module: Module = {
      id: Date.now().toString(),
      title: newModule.title,
      type: newModule.type as "video" | "document" | "quiz",
      duration: newModule.duration,
      order: formData.modules.length
    };

    setFormData(prev => ({
      ...prev,
      modules: [...prev.modules, module]
    }));

    setNewModule({ title: "", type: "video", duration: "" });
  };

  const removeModule = (moduleId: string) => {
    setFormData(prev => ({
      ...prev,
      modules: prev.modules.filter(m => m.id !== moduleId)
    }));
  };


  const handleSave = () => {
    onSave(formData);
  };

  const getModuleIcon = (type: string) => {
    switch (type) {
      case "video": return <Video size={16} className="text-red-500" />;
      case "document": return <FileText size={16} className="text-blue-500" />;
      case "quiz": return <Edit3 size={16} className="text-green-500" />;
      default: return <FileText size={16} />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {course ? "Chỉnh sửa khóa học" : "Tạo khóa học mới"}
          </h1>
          <p className="text-gray-600 mt-1">
            {course ? "Cập nhật thông tin và nội dung khóa học" : "Tạo khóa học mới để chia sẻ kiến thức"}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Save size={16} />
            Lưu khóa học
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex px-6">
          {[
            { id: "basic", label: "Thông tin cơ bản" },
            { id: "content", label: "Nội dung" },
            { id: "settings", label: "Cài đặt" },
            { id: "preview", label: "Xem trước" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">
        {/* Basic Information Tab */}
        {activeTab === "basic" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên khóa học *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nhập tên khóa học"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mô tả ngắn
                  </label>
                  <input
                    type="text"
                    value={formData.shortDescription}
                    onChange={(e) => handleInputChange("shortDescription", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Mô tả ngắn gọn về khóa học"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Giá (USD)
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Thời lượng
                    </label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => handleInputChange("duration", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="VD: 2 giờ 30 phút"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Danh mục
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange("category", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Chọn danh mục</option>
                      <option value="immigration">Định cư Canada</option>
                      <option value="study">Du học</option>
                      <option value="business">Kinh doanh</option>
                      <option value="life-skills">Kỹ năng sống</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Độ khó
                    </label>
                    <select
                      value={formData.level}
                      onChange={(e) => handleInputChange("level", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="beginner">Cơ bản</option>
                      <option value="intermediate">Trung cấp</option>
                      <option value="advanced">Nâng cao</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hình ảnh khóa học
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  {formData.image ? (
                    <div className="relative">
                      <img
                        src={formData.image}
                        alt="Course"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => handleInputChange("image", "")}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Image className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        <Upload size={16} className="inline mr-2" />
                        Tải lên hình ảnh
                      </button>
                      <p className="text-sm text-gray-500 mt-2">
                        PNG, JPG lên đến 10MB
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả chi tiết
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Mô tả chi tiết về nội dung và lợi ích của khóa học..."
              />
            </div>
          </div>
        )}

        {/* Content Tab */}
        {activeTab === "content" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Nội dung khóa học</h3>
              <span className="text-sm text-gray-600">
                {formData.modules.length} bài học
              </span>
            </div>

            {/* Add new module */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Thêm bài học mới</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <input
                  type="text"
                  value={newModule.title}
                  onChange={(e) => setNewModule(prev => ({ ...prev, title: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tên bài học"
                />
                <select
                  value={newModule.type}
                  onChange={(e) => setNewModule(prev => ({ ...prev, type: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="video">Video</option>
                  <option value="document">Tài liệu</option>
                  <option value="quiz">Bài kiểm tra</option>
                </select>
                <input
                  type="text"
                  value={newModule.duration}
                  onChange={(e) => setNewModule(prev => ({ ...prev, duration: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Thời lượng"
                />
                <button
                  onClick={addModule}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus size={16} />
                  Thêm
                </button>
              </div>
            </div>

            {/* Modules list */}
            <div className="space-y-3">
              {formData.modules.map((module, index) => (
                <div key={module.id} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      {getModuleIcon(module.type)}
                      <div>
                        <h5 className="font-medium text-gray-900">{module.title}</h5>
                        <p className="text-sm text-gray-600">
                          {module.type} • {module.duration}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => removeModule(module.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số lần tải xuống tối đa
                </label>
                <input
                  type="number"
                  value={formData.maxDownloads}
                  onChange={(e) => handleInputChange("maxDownloads", parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="1"
                />
                <p className="text-sm text-gray-600 mt-1">
                  Số lần học viên có thể tải xuống khóa học sau khi mua
                </p>
              </div>

              <div>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => handleInputChange("isPublished", e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-900">Xuất bản khóa học</span>
                    <p className="text-sm text-gray-600">
                      Khóa học sẽ hiển thị công khai cho học viên
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Preview Tab */}
        {activeTab === "preview" && (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Xem trước khóa học</h3>
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden max-w-md">
                {formData.image && (
                  <img 
                    src={formData.image}
                    alt={formData.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h4 className="font-bold text-gray-900 mb-2">{formData.title || "Tên khóa học"}</h4>
                  <p className="text-gray-600 text-sm mb-3">{formData.shortDescription || "Mô tả ngắn"}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">${formData.price}</span>
                    <span className="text-sm text-gray-600">{formData.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}