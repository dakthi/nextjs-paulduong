import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";

export default function ContactPage() {
  return (
    <div className="px-2 py-8 sm:px-4 sm:py-12 lg:px-8 lg:py-16">
      <Container>
        <SectionTitle title="Liên hệ với Paul Duong">
          Tôi luôn sẵn sàng chia sẻ và hỗ trợ bạn trong hành trình định cư Canada
        </SectionTitle>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mt-8 sm:mt-12 lg:mt-16">
          {/* Contact Form */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Gửi tin nhắn cho tôi</h3>
            <form className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên đệm
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nguyễn Văn"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Tên
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="An"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+1 (xxx) xxx-xxxx"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Chủ đề
                </label>
                <select
                  id="subject"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Chọn chủ đề</option>
                  <option value="immigration">Tư vấn định cư Canada</option>
                  <option value="business">Tư vấn kinh doanh</option>
                  <option value="education">Tư vấn du học</option>
                  <option value="documents">Hỏi về tài liệu</option>
                  <option value="other">Khác</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Tin nhắn
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Xin chào Paul, tôi muốn hỏi về..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Gửi tin nhắn
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Thông tin liên hệ</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600">✉</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <p className="text-gray-600">duongtp08@gmail.com</p>
                    <p className="text-sm text-gray-500">Phản hồi trong vòng 24 giờ</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600">📱</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Mạng xã hội</h4>
                    <div className="space-y-2">
                      <a href="#" className="block text-blue-600 hover:text-blue-800 transition">Facebook</a>
                      <a href="#" className="block text-blue-600 hover:text-blue-800 transition">YouTube</a>
                      <a href="#" className="block text-blue-600 hover:text-blue-800 transition">TikTok</a>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600">🏢</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Công ty</h4>
                    <p className="text-gray-600">Campbell Group</p>
                    <p className="text-sm text-gray-500">Business & Immigration Services</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Dịch vụ tư vấn</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Tư vấn định cư Canada
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Hướng dẫn du học Canada
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Tư vấn kinh doanh và đầu tư
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Coaching phát triển cá nhân
                </li>
              </ul>
            </div>

            {/* Testimonial */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-3">Phản hồi từ khách hàng</h4>
              <blockquote className="text-gray-700 italic mb-4">
                "Paul đã giúp gia đình tôi thực hiện được giấc mơ định cư Canada. Sự tận tâm và chuyên môn của anh ấy thật đáng ngưỡng mộ."
              </blockquote>
              <cite className="text-sm text-gray-600">- Nguyễn Thị Lan, Calgary</cite>
            </div>

            {/* Call to Action */}
            <div className="text-center bg-blue-600 text-white rounded-lg p-6">
              <h4 className="text-xl font-bold mb-2">Sẵn sàng bắt đầu hành trình?</h4>
              <p className="mb-4">Đặt lịch tư vấn miễn phí 30 phút với Paul</p>
              <button className="bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors border border-gray-300">
                Đặt lịch ngay
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Câu hỏi thường gặp</h3>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-2">Tôi có thể tư vấn trực tuyến không?</h4>
              <p className="text-gray-600">Có, tôi cung cấp dịch vụ tư vấn trực tuyến qua video call cho khách hàng ở khắp nơi trên thế giới.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-2">Chi phí tư vấn là bao nhiêu?</h4>
              <p className="text-gray-600">Buổi tư vấn đầu tiên 30 phút hoàn toàn miễn phí. Các gói tư vấn chi tiết sẽ được thảo luận dựa trên nhu cầu cụ thể.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-2">Tôi cần chuẩn bị gì cho buổi tư vấn?</h4>
              <p className="text-gray-600">Hãy chuẩn bị danh sách câu hỏi, thông tin về tình trạng hiện tại và mục tiêu bạn muốn đạt được.</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}