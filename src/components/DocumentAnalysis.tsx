"use client";

import { useState, useEffect } from "react";
import { Eye, Clock, Hash, Globe, TrendingUp, Star } from "lucide-react";

interface DocumentAnalysis {
  keywords: string[];
  summary: string;
  language: string;
  wordCount: number;
  readingTime: number;
}

interface Document {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  isFree: boolean;
  fileName: string;
  fileSize: number;
  downloadCount: number;
  viewCount: number;
  createdAt: string;
  analysis?: DocumentAnalysis;
}

interface DocumentAnalysisProps {
  document: Document;
  showRecommendations?: boolean;
}

export function DocumentAnalysis({ document, showRecommendations = true }: DocumentAnalysisProps) {
  const [recommendations, setRecommendations] = useState<Document[]>([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);

  useEffect(() => {
    if (showRecommendations) {
      fetchRecommendations();
    }
  }, [document.id, showRecommendations]);

  const fetchRecommendations = async () => {
    setLoadingRecommendations(true);
    try {
      const response = await fetch(`/api/documents/recommendations?documentId=${document.id}&limit=3`);
      if (response.ok) {
        const data = await response.json();
        setRecommendations(data.recommendations);
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoadingRecommendations(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getLanguageLabel = (code: string): string => {
    return code === 'vi' ? 'Tiếng Việt' : 'English';
  };

  return (
    <div className="space-y-6">
      {/* Document Stats */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin tài liệu</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Eye size={16} className="text-blue-600" />
            <span className="text-gray-600">{document.viewCount} lượt xem</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp size={16} className="text-green-600" />
            <span className="text-gray-600">{document.downloadCount} lượt tải</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Clock size={16} className="text-orange-600" />
            <span className="text-gray-600">
              {document.analysis?.readingTime || 'N/A'} phút đọc
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Globe size={16} className="text-purple-600" />
            <span className="text-gray-600">
              {document.analysis?.language ? getLanguageLabel(document.analysis.language) : 'N/A'}
            </span>
          </div>
        </div>

        {document.analysis?.wordCount && (
          <div className="mt-4 text-sm text-gray-600">
            <strong>{document.analysis.wordCount.toLocaleString()}</strong> từ • 
            <strong> {formatFileSize(document.fileSize)}</strong>
          </div>
        )}
      </div>

      {/* Keywords */}
      {document.analysis?.keywords && document.analysis.keywords.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Hash size={18} />
            Từ khóa chính
          </h3>
          
          <div className="flex flex-wrap gap-2">
            {document.analysis.keywords.slice(0, 10).map((keyword, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      {document.analysis?.summary && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tóm tắt nội dung</h3>
          <p className="text-gray-700 leading-relaxed">
            {document.analysis.summary}
          </p>
        </div>
      )}

      {/* Recommendations */}
      {showRecommendations && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Star size={18} />
            Tài liệu liên quan
          </h3>
          
          {loadingRecommendations ? (
            <div className="text-center py-4 text-gray-500">
              Đang tải gợi ý...
            </div>
          ) : recommendations.length > 0 ? (
            <div className="space-y-4">
              {recommendations.map((rec) => (
                <div key={rec.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1 line-clamp-1">
                      {rec.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {rec.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{rec.downloadCount} lượt tải</span>
                      <span className="flex items-center gap-1">
                        {rec.isFree ? (
                          <span className="text-green-600 font-medium">Miễn phí</span>
                        ) : (
                          <span>${rec.price}</span>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500 mb-1">
                      Độ liên quan: {Math.round((rec as any).similarity * 100)}%
                    </div>
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              Không có tài liệu liên quan
            </div>
          )}
        </div>
      )}
    </div>
  );
}