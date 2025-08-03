"use client";

import { useState } from "react";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Maximize, 
  BookOpen, 
  Download,
  Clock,
  CheckCircle,
  FileText,
  Eye
} from "lucide-react";

interface CourseModule {
  id: number;
  title: string;
  duration: string;
  isCompleted: boolean;
  videoUrl?: string;
  documentUrl?: string;
  type: "video" | "document" | "quiz";
}

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  totalDuration: string;
  progress: number;
  modules: CourseModule[];
  image: string;
}

interface CourseViewerProps {
  course: Course;
  onProgress: (moduleId: number, progress: number) => void;
  onDownloadCertificate?: () => void;
}

export function CourseViewer({ course, onProgress, onDownloadCertificate }: CourseViewerProps) {
  const [currentModule, setCurrentModule] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);

  const handleModuleComplete = (moduleId: number) => {
    onProgress(moduleId, 100);
  };

  const currentModuleData = course.modules[currentModule];
  const completedModules = course.modules.filter(m => m.isCompleted).length;

  return (
    <div className="bg-white min-h-screen">
      {/* Course Header */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <img 
              src={course.image}
              alt={course.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
              <div className="flex items-center gap-6 text-sm text-gray-300">
                <span>Giảng viên: {course.instructor}</span>
                <span className="flex items-center gap-1">
                  <Clock size={16} />
                  {course.totalDuration}
                </span>
                <span>{completedModules}/{course.modules.length} bài học</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-300 mb-1">Tiến độ</div>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <span className="text-sm font-semibold">{course.progress}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 sm:gap-6 px-2 py-2 sm:px-4 sm:py-4 lg:px-6 lg:py-6">
        {/* Main Content Area */}
        <div className="flex-1 lg:order-1 order-2">
          {/* Video/Content Player */}
          <div className="bg-black rounded-lg overflow-hidden mb-4 sm:mb-6">
            {currentModuleData.type === "video" ? (
              <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    {isPlaying ? <Pause size={32} /> : <Play size={32} />}
                  </div>
                  <p className="text-lg font-medium mb-2">{currentModuleData.title}</p>
                  <p className="text-gray-300">{currentModuleData.duration}</p>
                </div>
                
                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="text-white hover:text-gray-300"
                    >
                      {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    </button>
                    <button className="text-white hover:text-gray-300">
                      <SkipBack size={20} />
                    </button>
                    <button className="text-white hover:text-gray-300">
                      <SkipForward size={20} />
                    </button>
                    <div className="flex-1 bg-white bg-opacity-30 rounded-full h-1">
                      <div className="bg-white h-1 rounded-full w-1/3"></div>
                    </div>
                    <button className="text-white hover:text-gray-300">
                      <Volume2 size={20} />
                    </button>
                    <button className="text-white hover:text-gray-300">
                      <Maximize size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <FileText size={48} className="text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">
                    {currentModuleData.title}
                  </h3>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                    Mở tài liệu
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Module Info */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {currentModuleData.title}
                </h2>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Clock size={16} />
                    {currentModuleData.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    {currentModuleData.isCompleted ? (
                      <>
                        <CheckCircle size={16} className="text-green-500" />
                        Đã hoàn thành
                      </>
                    ) : (
                      <>
                        <Eye size={16} />
                        Đang học
                      </>
                    )}
                  </span>
                </div>
              </div>
              {!currentModuleData.isCompleted && (
                <button
                  onClick={() => handleModuleComplete(currentModuleData.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Đánh dấu hoàn thành
                </button>
              )}
            </div>
          </div>

          {/* Additional Resources */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tài liệu bổ sung</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-blue-600" />
                  <span className="font-medium">Bài tập thực hành</span>
                </div>
                <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  <Download size={16} />
                  Tải xuống
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-green-600" />
                  <span className="font-medium">Slide bài giảng</span>
                </div>
                <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  <Download size={16} />
                  Tải xuống
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Course Modules */}
        <div className="w-full lg:w-80 lg:order-2 order-1">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-semibold text-gray-900">Nội dung khóa học</h3>
              <p className="text-sm text-gray-600">
                {completedModules}/{course.modules.length} bài học đã hoàn thành
              </p>
            </div>
            
            <div className="max-h-96 lg:max-h-96 overflow-y-auto">
              {course.modules.map((module, index) => (
                <button
                  key={module.id}
                  onClick={() => setCurrentModule(index)}
                  className={`w-full p-4 text-left border-b border-gray-100 hover:bg-gray-50 transition ${
                    index === currentModule ? "bg-blue-50 border-l-4 border-l-blue-600" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                      module.isCompleted 
                        ? "bg-green-500 text-white" 
                        : index === currentModule
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}>
                      {module.isCompleted ? (
                        <CheckCircle size={16} />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm mb-1">
                        {module.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {module.duration}
                        </span>
                        <span className="capitalize">{module.type}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Certificate Download */}
          {course.progress === 100 && onDownloadCertificate && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">
                Chúc mừng!
              </h4>
              <p className="text-sm text-green-700 mb-4">
                Bạn đã hoàn thành khóa học. Tải xuống chứng chỉ của bạn!
              </p>
              <button
                onClick={onDownloadCertificate}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                <Download size={16} />
                Tải chứng chỉ
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}