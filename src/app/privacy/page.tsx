import { Container } from "@/components/Container";

export default function PrivacyPage() {
  return (
    <div className="py-20 bg-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Chính sách bảo mật
          </h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-8">
              Cập nhật lần cuối: Tháng 12, 2023
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Giới thiệu</h2>
              <p className="text-gray-700 leading-relaxed">
                Paul Duong cam kết bảo vệ quyền riêng tư và thông tin cá nhân của bạn. Chính sách bảo mật này 
                giải thích cách chúng tôi thu thập, sử dụng, và bảo vệ thông tin của bạn khi sử dụng trang web 
                và dịch vụ của chúng tôi.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Thông tin chúng tôi thu thập</h2>
              
              <h3 className="text-lg font-medium text-gray-900 mb-3">2.1 Thông tin cá nhân</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Chúng tôi thu thập thông tin bạn cung cấp trực tiếp:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                <li>Họ tên và địa chỉ email khi đăng ký tài khoản</li>
                <li>Thông tin thanh toán (được xử lý bởi Stripe, không lưu trữ trên hệ thống của chúng tôi)</li>
                <li>Thông tin liên hệ khi bạn gửi yêu cầu hỗ trợ</li>
                <li>Thông tin hồ sơ người dùng (tùy chọn)</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mb-3">2.2 Thông tin tự động</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Chúng tôi tự động thu thập:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Địa chỉ IP và thông tin thiết bị</li>
                <li>Lịch sử duyệt web và tương tác với trang web</li>
                <li>Cookies và công nghệ theo dõi tương tự</li>
                <li>Thông tin về tài liệu đã tải xuống</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Cách chúng tôi sử dụng thông tin</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Chúng tôi sử dụng thông tin của bạn để:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Cung cấp và duy trì dịch vụ của chúng tôi</li>
                <li>Xử lý giao dịch và gửi xác nhận đơn hàng</li>
                <li>Cung cấp hỗ trợ khách hàng</li>
                <li>Gửi thông báo quan trọng về dịch vụ</li>
                <li>Cải thiện trang web và trải nghiệm người dùng</li>
                <li>Gửi email marketing (với sự đồng ý của bạn)</li>
                <li>Phát hiện và ngăn chặn gian lận</li>
                <li>Tuân thủ các nghĩa vụ pháp lý</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Chia sẻ thông tin</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Chúng tôi không bán, thuê hoặc trao đổi thông tin cá nhân của bạn. Chúng tôi chỉ chia sẻ 
                thông tin trong các trường hợp sau:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Nhà cung cấp dịch vụ:</strong> Stripe (xử lý thanh toán), Google Analytics (phân tích website)</li>
                <li><strong>Yêu cầu pháp lý:</strong> Khi được yêu cầu bởi luật pháp hoặc cơ quan chức năng</li>
                <li><strong>Bảo vệ quyền lợi:</strong> Để bảo vệ quyền lợi, tài sản hoặc an toàn của chúng tôi và người dùng</li>
                <li><strong>Với sự đồng ý:</strong> Khi bạn đồng ý cho phép chúng tôi chia sẻ</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Bảo mật thông tin</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Chúng tôi thực hiện các biện pháp bảo mật kỹ thuật và tổ chức để bảo vệ thông tin của bạn:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Mã hóa SSL/TLS cho tất cả truyền tải dữ liệu</li>
                <li>Mã hóa mật khẩu bằng thuật toán bcrypt</li>
                <li>Giới hạn quyền truy cập dữ liệu theo nguyên tắc "cần biết"</li>
                <li>Giám sát và ghi log hoạt động hệ thống</li>
                <li>Sao lưu dữ liệu định kỳ và an toàn</li>
                <li>Kiểm tra bảo mật định kỳ</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Cookies và công nghệ theo dõi</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Chúng tôi sử dụng cookies và công nghệ tương tự để:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Duy trì phiên đăng nhập của bạn</li>
                <li>Ghi nhớ tùy chọn và thiết lập</li>
                <li>Phân tích lưu lượng truy cập website</li>
                <li>Cải thiện hiệu suất trang web</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Bạn có thể kiểm soát cookies thông qua cài đặt trình duyệt, nhưng việc tắt cookies có thể 
                ảnh hưởng đến chức năng của trang web.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Quyền của bạn</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Bạn có các quyền sau đối với thông tin cá nhân:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Quyền truy cập:</strong> Yêu cầu bản sao thông tin cá nhân chúng tôi có về bạn</li>
                <li><strong>Quyền sửa đổi:</strong> Yêu cầu sửa chữa thông tin không chính xác</li>
                <li><strong>Quyền xóa:</strong> Yêu cầu xóa thông tin cá nhân trong một số trường hợp</li>
                <li><strong>Quyền hạn chế:</strong> Yêu cầu hạn chế xử lý thông tin của bạn</li>
                <li><strong>Quyền phản đối:</strong> Phản đối việc xử lý thông tin cho mục đích marketing</li>
                <li><strong>Quyền di chuyển:</strong> Yêu cầu chuyển thông tin sang nhà cung cấp khác</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Lưu trữ dữ liệu</h2>
              <p className="text-gray-700 leading-relaxed">
                Chúng tôi lưu trữ thông tin cá nhân của bạn chỉ trong thời gian cần thiết để thực hiện 
                các mục đích đã nêu hoặc theo yêu cầu pháp lý. Dữ liệu sẽ được xóa an toàn khi không còn cần thiết.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Chuyển giao dữ liệu quốc tế</h2>
              <p className="text-gray-700 leading-relaxed">
                Dữ liệu của bạn có thể được xử lý và lưu trữ tại Canada và các quốc gia khác có luật bảo vệ 
                dữ liệu tương đương. Chúng tôi đảm bảo mức độ bảo vệ thích hợp cho mọi chuyển giao dữ liệu.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Người dùng dưới 18 tuổi</h2>
              <p className="text-gray-700 leading-relaxed">
                Dịch vụ của chúng tôi không dành cho người dưới 18 tuổi. Chúng tôi không cố ý thu thập 
                thông tin cá nhân từ trẻ em dưới 18 tuổi. Nếu bạn là cha mẹ và biết con mình đã cung cấp 
                thông tin cá nhân, vui lòng liên hệ với chúng tôi.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Thay đổi chính sách</h2>
              <p className="text-gray-700 leading-relaxed">
                Chúng tôi có thể cập nhật Chính sách bảo mật này định kỳ. Những thay đổi quan trọng sẽ được 
                thông báo qua email hoặc thông báo trên trang web. Việc tiếp tục sử dụng dịch vụ sau khi có 
                thay đổi đồng nghĩa với việc bạn chấp nhận chính sách mới.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">12. Liên hệ về bảo mật</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Nếu bạn có câu hỏi, thắc mắc hoặc yêu cầu về Chính sách bảo mật này, vui lòng liên hệ:
              </p>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email bảo mật:</strong> duongtp08@gmail.com<br />
                  <strong>Chủ đề:</strong> [Privacy Policy] - Yêu cầu của bạn<br />
                  <strong>Thời gian phản hồi:</strong> Trong vòng 72 giờ<br />
                  <strong>Công ty:</strong> Campbell Group, Canada
                </p>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}