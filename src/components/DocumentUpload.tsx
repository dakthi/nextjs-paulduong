"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { UploadDropzone } from "@/lib/uploadthing-utils";
import { X, Upload, FileText, DollarSign, Tag, Eye, Save, Loader2 } from "lucide-react";

interface DocumentForm {
  title: string;
  description: string;
  price: number;
  category: string;
  tags: string;
  isFree: boolean;
  isPublished: boolean;
}

interface DocumentUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function DocumentUpload({ isOpen, onClose, onSuccess }: DocumentUploadProps) {
  const { data: session } = useSession();
  const [uploadedFile, setUploadedFile] = useState<{url: string, name: string, size: number} | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<DocumentForm>({
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      category: "immigration",
      tags: "",
      isFree: false,
      isPublished: false,
    }
  });

  const isFree = watch("isFree");

  if (!isOpen) return null;

  const handleFileUpload = (result: any) => {
    if (result?.[0]) {
      setUploadedFile({
        url: result[0].url,
        name: result[0].name,
        size: result[0].size,
      });
      setError(null);
    }
  };

  const onSubmit = async (data: DocumentForm) => {
    if (!uploadedFile) {
      setError("Vui lòng tải lên tài liệu trước khi lưu");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      // Create document first
      const createResponse = await fetch('/api/documents/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          filePath: uploadedFile.url,
          fileName: uploadedFile.name,
          fileSize: uploadedFile.size,
          mimeType: getMimeType(uploadedFile.name),
          tags: data.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        }),
      });

      if (createResponse.ok) {
        const { document: createdDocument } = await createResponse.json();
        
        // Process document for content analysis (fire and forget)
        try {
          await fetch('/api/documents/process', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              documentId: createdDocument.id,
              fileUrl: uploadedFile.url
            }),
          });
        } catch (processError) {
          console.warn('Document processing failed:', processError);
          // Don't show error to user since document was created successfully
        }

        reset();
        setUploadedFile(null);
        onSuccess?.();
        onClose();
      } else {
        const errorData = await createResponse.json();
        setError(errorData.error || 'Có lỗi xảy ra khi lưu tài liệu');
      }
    } catch (error) {
      setError('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setSaving(false);
    }
  };

  const getMimeType = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf': return 'application/pdf';
      case 'doc': return 'application/msword';
      case 'docx': return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      case 'txt': return 'text/plain';
      default: return 'application/octet-stream';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const categories = [
    { value: "immigration", label: "Định cư & Di trú" },
    { value: "study", label: "Du học" },
    { value: "business", label: "Kinh doanh" },
    { value: "life-skills", label: "Kỹ năng sống" },
    { value: "legal", label: "Pháp lý" },
    { value: "other", label: "Khác" }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Tải lên tài liệu mới
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* File Upload Section */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <Upload size={20} />
                  Tải lên tài liệu
                </h3>
                
                {!uploadedFile ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <UploadDropzone
                      endpoint="documentUploader"
                      onClientUploadComplete={handleFileUpload}
                      onUploadError={(error: Error) => {
                        setError(`Lỗi tải lên: ${error.message}`);
                      }}
                      onUploadBegin={() => {
                        setUploading(true);
                        setError(null);
                      }}
                      onDrop={() => setUploading(false)}
                    />
                  </div>
                ) : (
                  <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText size={24} className="text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                          <p className="text-sm text-gray-600">{formatFileSize(uploadedFile.size)}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setUploadedFile(null)}
                        className="text-gray-400 hover:text-red-600 transition"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Pricing Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <DollarSign size={20} />
                  Định giá
                </h3>
                
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isFree"
                    {...register("isFree")}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isFree" className="text-sm font-medium text-gray-700">
                    Tài liệu miễn phí
                  </label>
                </div>

                {!isFree && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Giá (USD) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      {...register("price", { 
                        required: !isFree ? "Vui lòng nhập giá" : false,
                        min: { value: 0, message: "Giá phải lớn hơn 0" }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="9.99"
                    />
                    {errors.price && (
                      <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Document Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <FileText size={20} />
                Thông tin tài liệu
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiêu đề *
                </label>
                <input
                  type="text"
                  {...register("title", { required: "Vui lòng nhập tiêu đề" })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nhập tiêu đề tài liệu"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả *
                </label>
                <textarea
                  rows={4}
                  {...register("description", { required: "Vui lòng nhập mô tả" })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Mô tả chi tiết về tài liệu"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Danh mục *
                </label>
                <select
                  {...register("category", { required: "Vui lòng chọn danh mục" })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Tag size={16} />
                  Tags (phân cách bằng dấu phẩy)
                </label>
                <input
                  type="text"
                  {...register("tags")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="định cư, canada, hướng dẫn"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isPublished"
                  {...register("isPublished")}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isPublished" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Eye size={16} />
                  Xuất bản ngay
                </label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={!uploadedFile || saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
            >
              {saving && <Loader2 size={16} className="animate-spin" />}
              <Save size={16} />
              {saving ? "Đang lưu..." : "Lưu tài liệu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}