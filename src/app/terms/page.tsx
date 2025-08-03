import { Container } from "@/components/Container";

export default function TermsPage() {
  return (
    <div className="py-20 bg-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Điều khoản sử dụng
          </h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-8">
              Cập nhật lần cuối: Tháng 12, 2023
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Chấp nhận điều khoản</h2>
              <p className="text-gray-700 leading-relaxed">
                Bằng cách truy cập và sử dụng trang web của Paul Duong, bạn đồng ý tuân thủ và bị ràng buộc bởi 
                các điều khoản và điều kiện sử dụng này. Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản này, 
                bạn không được sử dụng dịch vụ của chúng tôi.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Mô tả dịch vụ</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Paul Duong cung cấp nền tảng bán tài liệu số về:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Hướng dẫn định cư Canada</li>
                <li>Tư vấn du học Canada</li>
                <li>Kinh nghiệm kinh doanh và phát triển cá nhân</li>
                <li>Sách và tài liệu chuyên môn</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Tài khoản người dùng</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Để mua và tải xuống tài liệu, bạn cần tạo tài khoản. Bạn có trách nhiệm:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Cung cấp thông tin chính xác và đầy đủ</li>
                <li>Bảo mật thông tin đăng nhập của bạn</li>
                <li>Thông báo ngay lập tức nếu tài khoản bị truy cập trái phép</li>
                <li>Chịu trách nhiệm cho tất cả hoạt động diễn ra dưới tài khoản của bạn</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Thanh toán và hoàn tiền</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Tất cả thanh toán được xử lý thông qua Stripe với bảo mật SSL. Chính sách hoàn tiền:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Hoàn tiền 100% trong vòng 7 ngày nếu không hài lòng</li>
                <li>Không hoàn tiền sau khi đã tải xuống tài liệu</li>
                <li>Hoàn tiền sẽ được xử lý trong vòng 5-7 ngày làm việc</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Quyền sở hữu trí tuệ</h2>
              <p className="text-gray-700 leading-relaxed">
                Tất cả nội dung trên trang web này, bao gồm văn bản, hình ảnh, logo và tài liệu, 
                đều thuộc sở hữu của Paul Duong và được bảo vệ bởi luật bản quyền. Bạn không được 
                sao chép, phân phối hoặc sử dụng nội dung này cho mục đích thương mại mà không có 
                sự cho phép bằng văn bản.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Quyền sử dụng tài liệu</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Khi mua tài liệu, bạn được cấp quyền:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Sử dụng cho mục đích cá nhân, không thương mại</li>
                <li>Tải xuống và lưu trữ trên thiết bị cá nhân</li>
                <li>In ra cho việc học tập cá nhân</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Bạn KHÔNG được phép chia sẻ, bán lại hoặc phân phối tài liệu cho người khác.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Hành vi bị cấm</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Bạn không được:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Sử dụng dịch vụ cho mục đích bất hợp pháp</li>
                <li>Cố gắng truy cập trái phép vào hệ thống</li>
                <li>Tải lên hoặc truyền tải virus hoặc mã độc hại</li>
                <li>Chia sẻ tài khoản với người khác</li>
                <li>Sao chép hoặc phân phối tài liệu đã mua</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Chấm dứt dịch vụ</h2>
              <p className="text-gray-700 leading-relaxed">
                Chúng tôi có quyền tạm ngừng hoặc chấm dứt tài khoản của bạn nếu vi phạm điều khoản này. 
                Bạn cũng có thể chấm dứt tài khoản bất cứ lúc nào bằng cách liên hệ với chúng tôi.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Giới hạn trách nhiệm</h2>
              <p className="text-gray-700 leading-relaxed">
                Paul Duong không chịu trách nhiệm về bất kỳ thiệt hại gián tiếp, ngẫu nhiên hoặc 
                hậu quả nào phát sinh từ việc sử dụng dịch vụ của chúng tôi. Trách nhiệm tối đa 
                của chúng tôi không vượt quá số tiền bạn đã thanh toán cho dịch vụ.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Thay đổi điều khoản</h2>
              <p className="text-gray-700 leading-relaxed">
                Chúng tôi có quyền cập nhật các điều khoản này bất cứ lúc nào. Những thay đổi sẽ 
                có hiệu lực ngay khi được đăng trên trang web. Việc tiếp tục sử dụng dịch vụ sau 
                khi có thay đổi đồng nghĩa với việc bạn chấp nhận điều khoản mới.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Liên hệ</h2>
              <p className="text-gray-700 leading-relaxed">
                Nếu bạn có bất kỳ câu hỏi nào về Điều khoản sử dụng này, vui lòng liên hệ:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> duongtp08@gmail.com<br />
                  <strong>Công ty:</strong> Campbell Group<br />
                  <strong>Địa chỉ:</strong> Canada
                </p>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}