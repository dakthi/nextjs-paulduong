"use client";

import { useState } from "react";
import { Download, FileText, Clock, Check, AlertCircle } from "lucide-react";

interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  fileSize: string;
  format: string;
  isPurchased: boolean;
  downloadCount?: number;
  maxDownloads?: number;
}

interface CourseDownloadProps {
  course: Course;
  onDownload: (courseId: number) => void;
  onPurchase: (courseId: number) => void;
}

export function CourseDownload({ course, onDownload, onPurchase }: CourseDownloadProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!course.isPurchased) {
      onPurchase(course.id);
      return;
    }

    setIsDownloading(true);
    try {
      await onDownload(course.id);
    } finally {
      setIsDownloading(false);
    }
  };

  const canDownload = course.isPurchased && 
    (!course.maxDownloads || (course.downloadCount || 0) < course.maxDownloads);

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {/* Course Image */}
      <div className="relative">
        <img 
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        {course.isPurchased && (
          <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Check size={12} />
            Đã mua
          </div>
        )}
      </div>

      {/* Course Info */}
      <div className="p-6">
        <h3 className="font-bold text-gray-900 mb-2 text-lg">
          {course.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {course.description}
        </p>

        {/* Course Details */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText size={16} />
            <span>{course.fileSize}</span>
          </div>
        </div>

        {/* Format Badge */}
        <div className="mb-4">
          <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
            {course.format}
          </span>
        </div>

        {/* Download Limits */}
        {course.isPurchased && course.maxDownloads && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 text-blue-700 text-sm">
              <AlertCircle size={16} />
              <span>
                Đã tải: {course.downloadCount || 0}/{course.maxDownloads} lần
              </span>
            </div>
          </div>
        )}

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">
            ${course.price}
          </div>
          
          <button
            onClick={handleDownload}
            disabled={isDownloading || (course.isPurchased && !canDownload)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition ${
              course.isPurchased
                ? canDownload
                  ? isDownloading
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isDownloading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Đang tải...
              </>
            ) : course.isPurchased ? (
              canDownload ? (
                <>
                  <Download size={16} />
                  Tải xuống
                </>
              ) : (
                <>
                  <AlertCircle size={16} />
                  Hết lượt tải
                </>
              )
            ) : (
              <>
                <Download size={16} />
                Mua ngay
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}