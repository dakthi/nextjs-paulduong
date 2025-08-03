import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { SearchBar } from "@/components/SearchBar";

// Paul Duong's Official Courses and Documents
const documents = [
  {
    id: 1,
    title: "Hướng dẫn xin giấy phép du học Canada",
    description: "Tài liệu chi tiết về quy trình xin visa du học Canada, từ chọn trường đến chuẩn bị hồ sơ và phỏng vấn.",
    price: 3.99,
    category: "Du học",
    image: "/img/paul-duong-2.jpg",
    downloadCount: 567,
    isFree: false,
  },
  {
    id: 2,
    title: "Bí quyết hội nhập thành công vào cuộc sống Canada",
    description: "Những kinh nghiệm thực tế và bí quyết để hội nhập nhanh chóng vào cuộc sống Canada, từ văn hóa đến sinh hoạt hàng ngày.",
    price: 4.99,
    category: "Văn hóa",
    image: "/img/paul-duong-3.jpg",
    downloadCount: 423,
    isFree: false,
  },
  {
    id: 3,
    title: "Bidong, a novel",
    description: "Tiểu thuyết của Paul Duong kể về hành trình của những người tị nạn thuyền nhân và cuộc sống tại Canada.",
    price: 4.99,
    category: "Sách",
    image: "/img/paul-duong-4.jpg",
    downloadCount: 289,
    isFree: false,
  },
  {
    id: 4,
    title: "Thành lập và vận hành doanh nghiệp tại Canada",
    description: "Hướng dẫn toàn diện về thành lập công ty, thuế doanh nghiệp, và quản lý kinh doanh hiệu quả tại Canada.",
    price: 4.99,
    category: "Kinh doanh",
    image: "/img/paul-duong-5.jpg",
    downloadCount: 345,
    isFree: false,
  },
  {
    id: 5,
    title: "Cẩm nang định cư Canada diện tay nghề dành cho người Việt Nam",
    description: "Hướng dẫn chi tiết về định cư Canada theo diện tay nghề, đặc biệt dành cho người Việt Nam với những lưu ý quan trọng.",
    price: 4.99,
    category: "Định cư",
    image: "/img/paul-duong-6.jpg",
    downloadCount: 678,
    isFree: false,
  }
];

const categories = ["Tất cả", "Du học", "Văn hóa", "Sách", "Kinh doanh", "Định cư"];

export default function DocumentsPage() {
  return (
    <div className="py-20">
      <Container>
        <SectionTitle
          title="Tài liệu của Paul Duong"
          desc="Bộ sưu tập tài liệu chất lượng cao về định cư Canada, du học và kinh doanh"
        />

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <SearchBar placeholder="Tìm kiếm tài liệu..." />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mt-12 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              className="px-6 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-200"
            >
              <div className="relative">
                <img
                  src={doc.image}
                  alt={doc.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {doc.category}
                  </span>
                </div>
                {doc.isFree && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Miễn phí
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {doc.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {doc.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-500">
                    📥 {doc.downloadCount} lượt tải
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {doc.isFree ? "Miễn phí" : `$${doc.price}`}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <a href={`/documents/${doc.id}`} className="flex-1 bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors font-medium text-center">
                    {doc.isFree ? "Tải xuống" : "Mua ngay"}
                  </a>
                  <a href={`/documents/${doc.id}`} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Xem trước
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium">
            Tải thêm tài liệu
          </button>
        </div>
      </Container>
    </div>
  );
}