import { Container } from "@/components/Container";

// Mock admin data
const adminStats = {
  totalUsers: 245,
  totalDocuments: 5,
  totalRevenue: 1247.88,
  totalDownloads: 892,
  monthlyRevenue: 389.75,
  newUsersThisMonth: 34
};

const recentOrders = [
  {
    id: "ORD-001",
    user: "Nguyễn Văn An",
    email: "nguyen.van.an@email.com",
    document: "Hướng dẫn xin giấy phép du học Canada",
    amount: 3.99,
    date: "2023-12-15",
    status: "completed"
  },
  {
    id: "ORD-002", 
    user: "Trần Thị Bình",
    email: "tran.thi.binh@email.com",
    document: "Bí quyết hội nhập thành công vào cuộc sống Canada",
    amount: 4.99,
    date: "2023-12-14",
    status: "completed"
  },
  {
    id: "ORD-003",
    user: "Lê Minh Cường",
    email: "le.minh.cuong@email.com", 
    document: "Cẩm nang định cư Canada diện tay nghề dành cho người Việt Nam",
    amount: 4.99,
    date: "2023-12-13",
    status: "pending"
  }
];

const documents = [
  {
    id: 1,
    title: "Hướng dẫn xin giấy phép du học Canada",
    price: 3.99,
    downloads: 567,
    revenue: 2230.33,
    status: "published"
  },
  {
    id: 2,
    title: "Bí quyết hội nhập thành công vào cuộc sống Canada",
    price: 4.99,
    downloads: 423,
    revenue: 2110.77,
    status: "published"
  },
  {
    id: 3,
    title: "Bidong, a novel",
    price: 4.99,
    downloads: 289,
    revenue: 1442.11,
    status: "published"
  }
];

export default function AdminPage() {
  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <Container>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Quản lý hệ thống và theo dõi hiệu suất
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <span className="text-xl">👥</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Tổng người dùng</p>
                  <p className="text-2xl font-bold text-gray-900">{adminStats.totalUsers}</p>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm text-green-600">+{adminStats.newUsersThisMonth} tháng này</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <span className="text-xl">📚</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Tài liệu</p>
                  <p className="text-2xl font-bold text-gray-900">{adminStats.totalDocuments}</p>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm text-gray-500">Đã xuất bản</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <span className="text-xl">💰</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Tổng doanh thu</p>
                  <p className="text-2xl font-bold text-gray-900">${adminStats.totalRevenue}</p>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm text-green-600">${adminStats.monthlyRevenue} tháng này</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <span className="text-xl">📥</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Lượt tải</p>
                  <p className="text-2xl font-bold text-gray-900">{adminStats.totalDownloads}</p>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm text-gray-500">Tổng cộng</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Đơn hàng gần đây
                  </h2>
                  <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Xem tất cả →
                  </a>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <div key={order.id} className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{order.user}</p>
                        <p className="text-sm text-gray-600">{order.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">${order.amount}</p>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          order.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status === 'completed' ? 'Hoàn thành' : 'Đang xử lý'}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{order.document}</p>
                    <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Document Performance */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Hiệu suất tài liệu
                  </h2>
                  <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Quản lý →
                  </a>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {documents.map((doc) => (
                  <div key={doc.id} className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900 text-sm line-clamp-1">
                        {doc.title}
                      </h3>
                      <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        {doc.status === 'published' ? 'Đã xuất bản' : 'Nháp'}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Giá</p>
                        <p className="font-medium">${doc.price}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Lượt tải</p>
                        <p className="font-medium">{doc.downloads}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Doanh thu</p>
                        <p className="font-medium">${doc.revenue}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Hành động nhanh
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-left">
                <div className="text-xl mb-2">📄</div>
                <p className="font-medium text-gray-900">Thêm tài liệu mới</p>
                <p className="text-sm text-gray-600">Tạo và xuất bản tài liệu</p>
              </button>
              <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-left">
                <div className="text-xl mb-2">👥</div>
                <p className="font-medium text-gray-900">Quản lý người dùng</p>
                <p className="text-sm text-gray-600">Xem và chỉnh sửa người dùng</p>
              </button>
              <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-left">
                <div className="text-xl mb-2">📊</div>
                <p className="font-medium text-gray-900">Báo cáo doanh thu</p>
                <p className="text-sm text-gray-600">Xem báo cáo chi tiết</p>
              </button>
              <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-left">
                <div className="text-xl mb-2">⚙️</div>
                <p className="font-medium text-gray-900">Cài đặt hệ thống</p>
                <p className="text-sm text-gray-600">Cấu hình và bảo mật</p>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}