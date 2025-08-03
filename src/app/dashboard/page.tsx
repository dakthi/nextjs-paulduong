import { Container } from "@/components/Container";

// Mock user data
const userData = {
  name: "Nguyễn Văn An",
  email: "nguyen.van.an@email.com",
  joinDate: "Tháng 10, 2023",
  totalPurchases: 3,
  totalSpent: 14.97
};

// Mock purchased documents
const purchasedDocuments = [
  {
    id: 1,
    title: "Hướng dẫn xin giấy phép du học Canada",
    price: 3.99,
    purchaseDate: "15/12/2023",
    status: "completed",
    image: "/img/paul-duong-2.jpg"
  },
  {
    id: 2,
    title: "Bí quyết hội nhập thành công vào cuộc sống Canada", 
    price: 4.99,
    purchaseDate: "10/12/2023",
    status: "completed",
    image: "/img/paul-duong-3.jpg"
  },
  {
    id: 3,
    title: "Cẩm nang định cư Canada diện tay nghề dành cho người Việt Nam",
    price: 4.99,
    purchaseDate: "05/12/2023", 
    status: "completed",
    image: "/img/paul-duong-6.jpg"
  }
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden lg:block w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
          <div className="p-6">
            {/* Profile Info */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-xl font-bold text-gray-600">
                  {userData.name.charAt(0)}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {userData.name}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                {userData.email}
              </p>
              <p className="text-xs text-gray-500">
                Tham gia từ {userData.joinDate}
              </p>
            </div>

            {/* Stats */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Tài liệu đã mua:</span>
                <span className="font-semibold text-gray-900">{userData.totalPurchases}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Tổng chi tiêu:</span>
                <span className="font-semibold text-gray-900">${userData.totalSpent}</span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-1">
              <a href="#" className="block px-3 py-2 text-sm text-gray-900 bg-gray-100 rounded-lg">
                Tài liệu của tôi
              </a>
              <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                Lịch sử mua hàng
              </a>
              <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                Cài đặt tài khoản
              </a>
              <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                Thông báo
              </a>
            </nav>

            <button className="w-full mt-6 px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              Đăng xuất
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-2 py-2 sm:px-4 sm:py-4 lg:px-8 lg:py-6">
          {/* Mobile Header */}
          <div className="lg:hidden mb-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Dashboard của tôi
            </h1>
            <p className="text-gray-600">
              Quản lý tài khoản và tài liệu đã mua
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {userData.totalPurchases}
              </div>
              <p className="text-sm text-gray-600">Tài liệu đã mua</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {purchasedDocuments.filter(doc => doc.status === 'completed').length}
              </div>
              <p className="text-sm text-gray-600">Đã tải xuống</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                ${userData.totalSpent}
              </div>
              <p className="text-sm text-gray-600">Tổng chi tiêu</p>
            </div>
          </div>

          {/* My Documents */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Tài liệu của tôi
              </h2>
              <a href="/documents" className="text-sm text-blue-600 hover:text-blue-700">
                Xem tất cả →
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {purchasedDocuments.map((doc) => (
                <div key={doc.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow">
                  <img 
                    src={doc.image}
                    alt={doc.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 text-sm">
                      {doc.title}
                    </h3>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600">
                        ${doc.price}
                      </span>
                      <span className="text-xs text-gray-500">
                        {doc.purchaseDate}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-xs hover:bg-blue-700 transition">
                        Tải xuống
                      </button>
                      <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded text-xs hover:bg-gray-50 transition">
                        Xem
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Hoạt động gần đây
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="divide-y divide-gray-200">
                {purchasedDocuments.map((doc, index) => (
                  <div key={index} className="p-4 flex items-center gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 text-sm">📄</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Đã mua "{doc.title}"
                      </p>
                      <p className="text-xs text-gray-600">
                        {doc.purchaseDate}
                      </p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      ${doc.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}