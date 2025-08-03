import { Container } from "@/components/Container";
import { notFound } from "next/navigation";
import Image from "next/image";

// Mock data - will be replaced with database
const documents = [
  {
    id: "1",
    title: "Hướng dẫn xin giấy phép du học Canada",
    description: "Tài liệu chi tiết về quy trình xin visa du học Canada, từ chọn trường đến chuẩn bị hồ sơ và phỏng vấn.",
    fullDescription: "Tài liệu toàn diện này sẽ hướng dẫn bạn từng bước trong quá trình xin visa du học Canada. Bao gồm cách chọn trường phù hợp, chuẩn bị hồ sơ đầy đủ, viết thư động cơ (SOP), chuẩn bị tài chính và các mẹo quan trọng cho buổi phỏng vấn visa. Đặc biệt có phần hướng dẫn chi tiết về các yêu cầu mới nhất năm 2024 và những lưu ý quan trọng dành riêng cho sinh viên Việt Nam.",
    price: 3.99,
    category: "Du học",
    image: "/img/paul-duong-2.jpg",
    downloadCount: 567,
    isFree: false,
    author: "Paul Duong",
    pages: 45,
    format: "PDF",
    language: "Tiếng Việt",
    lastUpdated: "Tháng 12, 2023",
    whatYouLearn: [
      "Cách chọn trường và chương trình phù hợp",
      "Quy trình nộp hồ sơ từng bước chi tiết", 
      "Cách viết thư động cơ (Statement of Purpose) hiệu quả",
      "Chuẩn bị tài chính và bảo lãnh tài chính",
      "Mẹo vượt qua buổi phỏng vấn visa",
      "Các yêu cầu mới nhất năm 2024",
      "Form mẫu và checklist đầy đủ"
    ]
  },
  {
    id: "2", 
    title: "Bí quyết hội nhập thành công vào cuộc sống Canada",
    description: "Những kinh nghiệm thực tế và bí quyết để hội nhập nhanh chóng vào cuộc sống Canada, từ văn hóa đến sinh hoạt hàng ngày.",
    fullDescription: "Dựa trên 38 năm kinh nghiệm sống tại Canada, tài liệu này chia sẻ những bí quyết thực tế để hội nhập thành công. Từ hiểu văn hóa Canada, xây dựng mạng lưới xã hội, tìm việc làm, đến những quy tắc không thành văn trong xã hội Canada. Đặc biệt hữu ích cho những người mới định cư muốn nhanh chóng thích nghi với cuộc sống mới.",
    price: 4.99,
    category: "Văn hóa",
    image: "/img/paul-duong-3.jpg",
    downloadCount: 423,
    isFree: false,
    author: "Paul Duong",
    pages: 62,
    format: "PDF",
    language: "Tiếng Việt",
    lastUpdated: "Tháng 11, 2023",
    whatYouLearn: [
      "Hiểu văn hóa và giá trị cốt lõi của Canada",
      "Cách xây dựng mạng lưới quan hệ xã hội",
      "Bí quyết tìm việc làm phù hợp",
      "Quy tắc giao tiếp trong môi trường công sở",
      "Cách tham gia các hoạt động cộng đồng",
      "Những điều cần tránh khi mới đến Canada",
      "Mẹo tiết kiệm chi phí sinh hoạt"
    ]
  }
];

interface DocumentDetailPageProps {
  params: { id: string };
}

export default function DocumentDetailPage({ params }: DocumentDetailPageProps) {
  const document = documents.find(doc => doc.id === params.id);

  if (!document) {
    notFound();
  }

  return (
    <div className="py-20 bg-white">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Breadcrumb */}
              <nav className="mb-8">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <a href="/documents" className="hover:text-gray-900">Tài liệu</a>
                  <span>›</span>
                  <span className="text-gray-900">{document.title}</span>
                </div>
              </nav>

              {/* Title and Meta */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {document.category}
                  </span>
                  <span className="text-gray-600 text-sm">
                    📥 {document.downloadCount} lượt tải
                  </span>
                </div>
                
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {document.title}
                </h1>
                
                <p className="text-xl text-gray-700 leading-relaxed mb-6">
                  {document.description}
                </p>

                <div className="flex items-center gap-6 text-sm text-gray-600 mb-8">
                  <div className="flex items-center gap-2">
                    <span>👤</span>
                    <span>{document.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📄</span>
                    <span>{document.pages} trang</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🗣️</span>
                    <span>{document.language}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📅</span>
                    <span>Cập nhật {document.lastUpdated}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Mô tả chi tiết</h2>
                <p className="text-gray-700 leading-relaxed">
                  {document.fullDescription}
                </p>
              </div>

              {/* What You'll Learn */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Bạn sẽ học được gì</h2>
                <ul className="space-y-3">
                  {document.whatYouLearn.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-gray-900 mt-1">✓</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Author Info */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Về tác giả</h3>
                <div className="flex items-start gap-4">
                  <img 
                    src="/img/paul-duong-1.jpg" 
                    alt="Paul Duong"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Paul Duong</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Luật sư di trú với 38 năm kinh nghiệm sống và làm việc tại Canada. 
                      Founder của Campbell Group, đã giúp hàng trăm gia đình thực hiện giấc mơ định cư Canada.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                {/* Preview Image */}
                <div className="mb-6">
                  <img 
                    src={document.image}
                    alt={document.title}
                    className="w-full rounded-lg shadow-md"
                  />
                </div>

                {/* Purchase Card */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 mb-6">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      ${document.price}
                    </div>
                    <p className="text-gray-600 text-sm">Truy cập trọn đời</p>
                  </div>

                  <button className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition font-medium mb-3">
                    Mua ngay
                  </button>
                  
                  <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition font-medium">
                    Xem trước
                  </button>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>Định dạng:</span>
                      <span>{document.format}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>Số trang:</span>
                      <span>{document.pages}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Ngôn ngữ:</span>
                      <span>{document.language}</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Bao gồm:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <span>✓</span>
                      <span>Tải xuống ngay lập tức</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span>✓</span>
                      <span>Truy cập trọn đời</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span>✓</span>
                      <span>Cập nhật miễn phí</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span>✓</span>
                      <span>Hỗ trợ qua email</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}