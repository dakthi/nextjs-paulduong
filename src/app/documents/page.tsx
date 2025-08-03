"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { SearchBar } from "@/components/SearchBar";
import { PaymentModal } from "@/components/PaymentModal";
import { AuthModal } from "@/components/AuthModal";
import { Download, Eye, Star, Users, ShoppingCart, FileText, Lock, Check, Loader2 } from "lucide-react";

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
      return "bg-gray-600 text-white hover:bg-gray-700";
    }

    if (document.isFree || access?.hasAccess) {
      return "bg-green-600 text-white hover:bg-green-700";
    }

    return "bg-blue-600 text-white hover:bg-blue-700";
  };

  return (
    <div className="py-20">
      <Container>
        <SectionTitle title="Tài liệu của Paul Duong">
          <p>Bộ sưu tập tài liệu chất lượng cao về định cư Canada, du học và kinh doanh</p>
        </SectionTitle>

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <SearchBar 
            placeholder="Tìm kiếm tài liệu..." 
            onSearch={setSearchTerm}
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-6 py-2 rounded-full transition ${
                selectedCategory === category.value
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Documents Grid */}
        {loading ? (
          <div className="text-center py-12">
            <Loader2 size={32} className="animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Đang tải tài liệu...</p>
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center py-12">
            <FileText size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Không tìm thấy tài liệu
            </h3>
            <p className="text-gray-600">
              Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {documents.map((document) => (
              <div key={document.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-200">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <FileText className="text-blue-600" size={20} />
                      <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                        {getCategoryLabel(document.category)}
                      </span>
                    </div>
                    {document.isFree && (
                      <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
                        MIỄN PHÍ
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-gray-900 mb-3 line-clamp-2">
                    {document.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {document.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Download size={14} />
                      {document.downloadCount} lượt tải
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye size={14} />
                      {document.viewCount} lượt xem
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {formatFileSize(document.fileSize)}
                    </div>
                    <button
                      onClick={() => handleDownload(document)}
                      disabled={downloading === document.id}
                      className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${getButtonStyle(document)}`}
                    >
                      {getButtonContent(document)}
                    </button>
                  </div>

                  {document.tags && document.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-4">
                      {document.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
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