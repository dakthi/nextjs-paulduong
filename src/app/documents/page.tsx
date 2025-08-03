"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { SearchBar } from "@/components/SearchBar";
import { PaymentModal } from "@/components/PaymentModal";
import { AuthModal } from "@/components/AuthModal";
import { Download, Eye, Star, Users, ShoppingCart, FileText, Lock, Check, Loader2, Filter, Grid, List } from "lucide-react";

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
  downloadCount: number;
  viewCount: number;
  createdAt: string;
}

interface AccessStatus {
  [documentId: string]: {
    hasAccess: boolean;
    reason?: string;
  };
}

const categories = [
  { value: "all", label: "Tất cả" },
  { value: "immigration", label: "Định cư & Di trú" },
  { value: "study", label: "Du học" },
  { value: "business", label: "Kinh doanh" },
  { value: "life-skills", label: "Kỹ năng sống" },
  { value: "legal", label: "Pháp lý" },
  { value: "other", label: "Khác" }
];

export default function DocumentsPage() {
  const { data: session } = useSession();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [accessStatus, setAccessStatus] = useState<AccessStatus>({});
  const [downloading, setDownloading] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'price'>('newest');

  const fetchDocuments = async () => {
    try {
      const params = new URLSearchParams({
        published: "true",
        ...(selectedCategory !== "all" && { category: selectedCategory }),
        ...(searchTerm && { search: searchTerm })
      });

      const response = await fetch(`/api/documents/list?${params}`);
      if (response.ok) {
        const data = await response.json();
        setDocuments(data.documents);
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkAccess = async (documentId: string) => {
    if (!session?.user) return;

    try {
      const response = await fetch(`/api/payments/check-access?documentId=${documentId}`);
      if (response.ok) {
        const data = await response.json();
        setAccessStatus(prev => ({
          ...prev,
          [documentId]: data
        }));
      }
    } catch (error) {
      console.error("Error checking access:", error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [selectedCategory, searchTerm]);

  useEffect(() => {
    if (session?.user && documents.length > 0) {
      documents.forEach(doc => {
        checkAccess(doc.id);
      });
    }
  }, [session, documents]);

  const handleDownload = async (document: Document) => {
    if (!session?.user) {
      setShowAuthModal(true);
      return;
    }

    const access = accessStatus[document.id];
    if (!access?.hasAccess && !document.isFree) {
      setSelectedDocument(document);
      setShowPaymentModal(true);
      return;
    }

    setDownloading(document.id);
    try {
      const response = await fetch('/api/documents/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ documentId: document.id }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Create download link
        const link = window.document.createElement('a');
        link.href = data.downloadUrl;
        link.download = data.fileName;
        link.target = '_blank';
        window.document.body.appendChild(link);
        link.click();
        window.document.body.removeChild(link);

        // Refresh access status and document stats
        checkAccess(document.id);
        fetchDocuments();
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Có lỗi xảy ra khi tải tài liệu');
      }
    } catch (error) {
      console.error("Download error:", error);
      alert('Có lỗi xảy ra khi tải tài liệu');
    } finally {
      setDownloading(null);
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

  const getButtonContent = (document: Document) => {
    const access = accessStatus[document.id];
    const isDownloading = downloading === document.id;

    if (isDownloading) {
      return (
        <>
          <Loader2 size={16} className="animate-spin" />
          Đang tải...
        </>
      );
    }

    if (!session?.user) {
      return (
        <>
          <Lock size={16} />
          Đăng nhập để tải
        </>
      );
    }

    if (document.isFree) {
      return (
        <>
          <Download size={16} />
          Tải miễn phí
        </>
      );
    }

    if (access?.hasAccess) {
      return (
        <>
          <Check size={16} />
          Tải xuống
        </>
      );
    }

    return (
      <>
        <ShoppingCart size={16} />
        Mua ${document.price}
      </>
    );
  };

  const getButtonStyle = (document: Document) => {
    const access = accessStatus[document.id];
    const isDownloading = downloading === document.id;

    if (isDownloading) {
      return "bg-gray-400 text-white cursor-not-allowed";
    }

    if (!session?.user) {
      return "bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800";
    }

    if (document.isFree || access?.hasAccess) {
      return "bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800";
    }

    return "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800";
  };

  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Tài liệu của Paul Duong
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Bộ sưu tập tài liệu chất lượng cao về định cư Canada, du học và kinh doanh
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-12">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full lg:max-w-2xl">
              <SearchBar 
                placeholder="Tìm kiếm tài liệu..." 
                onSearch={setSearchTerm}
              />
            </div>
            <div className="flex items-center gap-4">
              {/* Sort */}
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value as 'newest' | 'popular' | 'price')}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="popular">Phổ biến</option>
                  <option value="price">Giá thấp</option>
                </select>
              </div>
              {/* View Mode */}
              <div className="flex items-center border border-gray-300 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-gray-900 text-white' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-gray-900 text-white' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-6 py-3 rounded-2xl transition-all transform hover:scale-105 font-semibold ${
                selectedCategory === category.value
                  ? "bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Documents Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="animate-pulse">
                  <div className="bg-gray-200 h-48 w-full"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                      <div className="h-8 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText size={48} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Không tìm thấy tài liệu
            </h3>
            <p className="text-gray-600 text-lg mb-8">
              Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </p>
            <button 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors font-semibold"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        ) : (
          <div className={`grid gap-6 sm:gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1 max-w-4xl mx-auto'
          }`}>
            {documents.map((document) => (
              <div key={document.id} className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group transform hover:-translate-y-1 ${
                viewMode === 'list' ? 'flex' : ''
              }`}>
                {viewMode === 'list' && (
                  <div className="w-32 h-32 flex-shrink-0">
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-l-2xl flex items-center justify-center">
                      <FileText className="w-12 h-12 text-gray-500" />
                    </div>
                  </div>
                )}
                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <FileText className="text-white" size={16} />
                      </div>
                      <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                        {getCategoryLabel(document.category)}
                      </span>
                    </div>
                    {document.isFree && (
                      <span className="text-xs font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full animate-pulse">
                        MIỄN PHÍ
                      </span>
                    )}
                  </div>

                  <h3 className={`font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors ${
                    viewMode === 'list' ? 'text-lg' : 'text-lg'
                  }`}>
                    {document.title}
                  </h3>
                  
                  <p className={`text-gray-600 mb-4 line-clamp-3 leading-relaxed ${
                    viewMode === 'list' ? 'text-base' : 'text-sm'
                  }`}>
                    {document.description}
                  </p>

                  <div className={`flex items-center gap-4 text-sm text-gray-500 mb-6 ${
                    viewMode === 'list' ? 'justify-start' : 'justify-between'
                  }`}>
                    <span className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full">
                      <Download size={14} className="text-blue-500" />
                      <span className="font-medium">{document.downloadCount}</span>
                    </span>
                    <span className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full">
                      <Eye size={14} className="text-green-500" />
                      <span className="font-medium">{document.viewCount}</span>
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatFileSize(document.fileSize)}
                    </span>
                  </div>

                  <div className={`flex items-center ${
                    viewMode === 'list' ? 'justify-end gap-4' : 'justify-between'
                  }`}>
                    {viewMode === 'grid' && (
                      <div className="text-lg font-bold text-gray-900">
                        {document.isFree ? (
                          <span className="text-green-600">Miễn phí</span>
                        ) : (
                          `$${document.price}`
                        )}
                      </div>
                    )}
                    <button
                      onClick={() => handleDownload(document)}
                      disabled={downloading === document.id}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl ${getButtonStyle(document)}`}
                    >
                      {getButtonContent(document)}
                    </button>
                    {viewMode === 'list' && (
                      <div className="text-xl font-bold text-gray-900">
                        {document.isFree ? (
                          <span className="text-green-600">Miễn phí</span>
                        ) : (
                          `$${document.price}`
                        )}
                      </div>
                    )}
                  </div>

                  {document.tags && document.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {document.tags.slice(0, viewMode === 'list' ? 5 : 3).map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-3 py-1 rounded-full font-medium hover:from-gray-200 hover:to-gray-300 transition-all cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                      {document.tags.length > (viewMode === 'list' ? 5 : 3) && (
                        <span className="text-xs text-gray-500 px-2 py-1">
                          +{document.tags.length - (viewMode === 'list' ? 5 : 3)} thêm
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Payment Modal */}
        {selectedDocument && (
          <PaymentModal
            isOpen={showPaymentModal}
            onClose={() => {
              setShowPaymentModal(false);
              setSelectedDocument(null);
            }}
            onSuccess={() => {
              setShowPaymentModal(false);
              setSelectedDocument(null);
              if (selectedDocument) {
                checkAccess(selectedDocument.id);
              }
            }}
            document={{
              id: selectedDocument.id,
              title: selectedDocument.title,
              price: selectedDocument.price,
            }}
          />
        )}

        {/* Auth Modal */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      </Container>
    </div>
  );
}