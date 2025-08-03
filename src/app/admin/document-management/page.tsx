"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { DocumentUpload } from "@/components/DocumentUpload";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye,
  Download,
  FileText,
  DollarSign,
  Users,
  TrendingUp,
  Upload as UploadIcon
} from "lucide-react";

interface Document {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  isFree: boolean;
  isPublished: boolean;
  fileName: string;
  fileSize: number;
  mimeType: string;
  downloadCount: number;
  viewCount: number;
  createdAt: string;
  publishedAt: string | null;
}

interface DocumentsResponse {
  documents: Document[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export default function DocumentManagementPage() {
  const { data: session } = useSession();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [publishedFilter, setPublishedFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  const categories = [
    { value: "all", label: "Tất cả danh mục" },
    { value: "immigration", label: "Định cư & Di trú" },
    { value: "study", label: "Du học" },
    { value: "business", label: "Kinh doanh" },
    { value: "life-skills", label: "Kỹ năng sống" },
    { value: "legal", label: "Pháp lý" },
    { value: "other", label: "Khác" }
  ];

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        ...(categoryFilter !== "all" && { category: categoryFilter }),
        ...(publishedFilter !== "all" && { published: publishedFilter }),
        ...(searchTerm && { search: searchTerm })
      });

      const response = await fetch(`/api/documents/list?${params}`);
      if (response.ok) {
        const data: DocumentsResponse = await response.json();
        setDocuments(data.documents);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.role === "ADMIN") {
      fetchDocuments();
    }
  }, [session, currentPage, categoryFilter, publishedFilter, searchTerm]);

  const handleDeleteDocument = async (documentId: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa tài liệu này?")) {
      try {
        const response = await fetch(`/api/documents/${documentId}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          fetchDocuments(); // Refresh the list
        } else {
          alert("Có lỗi xảy ra khi xóa tài liệu");
        }
      } catch (error) {
        console.error("Error deleting document:", error);
        alert("Có lỗi xảy ra khi xóa tài liệu");
      }
    }
  };

  const togglePublishStatus = async (documentId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/documents/${documentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isPublished: !currentStatus,
          publishedAt: !currentStatus ? new Date().toISOString() : null
        })
      });
      
      if (response.ok) {
        fetchDocuments(); // Refresh the list
      } else {
        alert("Có lỗi xảy ra khi cập nhật trạng thái");
      }
    } catch (error) {
      console.error("Error updating publish status:", error);
      alert("Có lỗi xảy ra khi cập nhật trạng thái");
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCategoryLabel = (value: string) => {
    return categories.find(cat => cat.value === value)?.label || value;
  };

  if (session?.user?.role !== "ADMIN") {
    return (
      <div className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Truy cập bị từ chối</h1>
            <p className="text-gray-600">Bạn không có quyền truy cập trang này.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý tài liệu</h1>
            <p className="text-gray-600">Tải lên và quản lý tài liệu của bạn</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <Plus size={20} />
            Tải lên tài liệu
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng tài liệu</p>
                <p className="text-2xl font-bold text-gray-900">{pagination.total}</p>
              </div>
              <FileText className="text-blue-600" size={24} />
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Đã xuất bản</p>
                <p className="text-2xl font-bold text-gray-900">
                  {documents.filter(d => d.isPublished).length}
                </p>
              </div>
              <Eye className="text-green-600" size={24} />
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng lượt tải</p>
                <p className="text-2xl font-bold text-gray-900">
                  {documents.reduce((sum, d) => sum + d.downloadCount, 0)}
                </p>
              </div>
              <Download className="text-purple-600" size={24} />
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Doanh thu ước tính</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${documents.reduce((sum, d) => sum + (d.price * d.downloadCount), 0).toFixed(2)}
                </p>
              </div>
              <DollarSign className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Tìm kiếm tài liệu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            
            <select
              value={publishedFilter}
              onChange={(e) => setPublishedFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="true">Đã xuất bản</option>
              <option value="false">Chưa xuất bản</option>
            </select>
            
            <button
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("all");
                setPublishedFilter("all");
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Xóa bộ lọc
            </button>
          </div>
        </div>

        {/* Documents Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tài liệu
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Danh mục
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Giá
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thống kê
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày tạo
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                      Đang tải...
                    </td>
                  </tr>
                ) : documents.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                      Không có tài liệu nào
                    </td>
                  </tr>
                ) : (
                  documents.map((document) => (
                    <tr key={document.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <FileText className="text-blue-600 mr-3" size={20} />
                          <div>
                            <div className="text-sm font-medium text-gray-900 line-clamp-1">
                              {document.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {document.fileName} • {formatFileSize(document.fileSize)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {getCategoryLabel(document.category)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {document.isFree ? (
                          <span className="text-green-600 font-medium">Miễn phí</span>
                        ) : (
                          `$${document.price}`
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => togglePublishStatus(document.id, document.isPublished)}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            document.isPublished 
                              ? "bg-green-100 text-green-800 hover:bg-green-200" 
                              : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                          } transition`}
                        >
                          {document.isPublished ? "Đã xuất bản" : "Nháp"}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="space-y-1">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Eye size={14} />
                              {document.viewCount}
                            </span>
                            <span className="flex items-center gap-1">
                              <Download size={14} />
                              {document.downloadCount}
                            </span>
                          </div>
                          {(document as any).analysis && (
                            <div className="text-xs text-gray-500">
                              {(document as any).analysis.wordCount} từ • 
                              {(document as any).analysis.readingTime} phút đọc
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {new Date(document.createdAt).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button className="text-gray-600 hover:text-blue-600 transition">
                            <Eye size={16} />
                          </button>
                          <button className="text-gray-600 hover:text-blue-600 transition">
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteDocument(document.id)}
                            className="text-gray-600 hover:text-red-600 transition"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Hiển thị {((currentPage - 1) * pagination.limit) + 1} đến {Math.min(currentPage * pagination.limit, pagination.total)} trong {pagination.total} kết quả
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Trước
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(pagination.pages, currentPage + 1))}
                  disabled={currentPage === pagination.pages}
                  className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sau
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Upload Modal */}
        <DocumentUpload
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onSuccess={() => {
            fetchDocuments();
            setShowUploadModal(false);
          }}
        />
      </div>
    </div>
  );
}