import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { DocumentIcon, GraduationIcon, BriefcaseIcon, GlobeIcon, HeartIcon, CheckIcon } from "@/components/Icons";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative px-4 py-12 sm:px-6 sm:py-16 lg:py-24 xl:py-32 bg-gradient-to-br from-gray-50 to-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <img 
                src="/img/paul-duong-1.jpg" 
                alt="Paul Duong" 
                className="w-28 h-28 sm:w-36 sm:h-36 mx-auto rounded-full border-4 border-white shadow-2xl object-cover ring-2 ring-gray-100"
              />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Paul Duong
            </h1>
            <div className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-700 leading-relaxed space-y-3">
              <p className="flex items-center justify-center gap-2">
                Chào mừng bạn đến với trang chính thức của Paul Duong! 
                <GlobeIcon className="w-6 h-6 text-blue-600" />
              </p>
              <p>
                Là một người đam mê kinh doanh, định cư, và phát triển cá nhân, tôi chia sẻ kinh nghiệm sống và làm việc tại Canada – từ định cư Canada diện tay nghề, hành trình du học Canada, đến góc nhìn thực tế về cuộc sống ở Canada.
              </p>
              <p>
                Bên cạnh đó, tôi còn cung cấp thông tin và tư vấn về các cơ hội đầu tư định cư Canada, giúp bạn và gia đình mở ra cánh cửa đến một tương lai mới tại đất nước đáng sống nhất thế giới.
              </p>
            </div>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <a href="/documents" className="bg-gray-900 text-white px-10 py-4 rounded-xl font-semibold hover:bg-gray-800 transform hover:scale-105 transition-all duration-200 text-center shadow-lg hover:shadow-xl">
                Tài liệu của tôi
              </a>
              <a href="/contact" className="border-2 border-gray-900 text-gray-900 px-10 py-4 rounded-xl font-semibold hover:bg-gray-900 hover:text-white transform hover:scale-105 transition-all duration-200 text-center shadow-lg hover:shadow-xl">
                Liên hệ tư vấn
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Services Section */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:py-20 bg-gray-50">
        <Container>
          <SectionTitle title="Dịch vụ của tôi">
            Cung cấp tài liệu và tư vấn chuyên nghiệp về định cư Canada
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mt-10 sm:mt-16">
            <div className="text-center p-8 rounded-2xl bg-white border border-gray-100 hover:shadow-2xl hover:border-gray-200 transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <DocumentIcon className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Tài liệu định cư</h3>
              <p className="text-gray-600 leading-relaxed">
                Bộ sưu tập tài liệu hướng dẫn định cư Canada chi tiết và cập nhật
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-white border border-gray-100 hover:shadow-2xl hover:border-gray-200 transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <GraduationIcon className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Kinh nghiệm du học</h3>
              <p className="text-gray-600 leading-relaxed">
                Chia sẻ hành trình du học và các mẹo thành công tại Canada
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-white border border-gray-100 hover:shadow-2xl hover:border-gray-200 transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BriefcaseIcon className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Tư vấn kinh doanh</h3>
              <p className="text-gray-600 leading-relaxed">
                Hướng dẫn khởi nghiệp và phát triển kinh doanh tại Canada
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Documents Section */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:py-20 bg-white">
        <Container>
          <SectionTitle title="Tài liệu nổi bật">
            Những tài liệu được quan tâm và tải xuống nhiều nhất
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mt-10 sm:mt-16">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
              <img src="/img/paul-duong-2.jpg" alt="Du học Canada" className="w-full h-52 object-cover" />
              <div className="p-6">
                <h3 className="text-lg font-bold mb-3 text-gray-900 leading-snug">Hướng dẫn xin giấy phép du học Canada</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">Tài liệu chi tiết về quy trình xin visa du học Canada</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">$3.99</span>
                  <a href="/documents/1" className="bg-gray-900 text-white px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-colors font-medium">
                    Xem chi tiết
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
              <img src="/img/paul-duong-3.jpg" alt="Hội nhập Canada" className="w-full h-52 object-cover" />
              <div className="p-6">
                <h3 className="text-lg font-bold mb-3 text-gray-900 leading-snug">Bí quyết hội nhập thành công vào cuộc sống Canada</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">Những kinh nghiệm thực tế để hội nhập nhanh chóng</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">$4.99</span>
                  <a href="/documents/2" className="bg-gray-900 text-white px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-colors font-medium">
                    Xem chi tiết
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
              <img src="/img/paul-duong-4.jpg" alt="Bidong Novel" className="w-full h-52 object-cover" />
              <div className="p-6">
                <h3 className="text-lg font-bold mb-3 text-gray-900 leading-snug">Bidong, a novel</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">Tiểu thuyết về hành trình của những người tị nạn thuyền nhân</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">$4.99</span>
                  <a href="/documents/3" className="bg-gray-900 text-white px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-colors font-medium">
                    Xem chi tiết
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 xl:block hidden">
              <img src="/img/paul-duong-6.jpg" alt="Định cư Canada" className="w-full h-52 object-cover" />
              <div className="p-6">
                <h3 className="text-lg font-bold mb-3 text-gray-900 leading-snug">Cẩm nang định cư Canada diện tay nghề</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">Hướng dẫn toàn diện về chương trình định cư</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">$4.99</span>
                  <a href="/documents/4" className="bg-gray-900 text-white px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-colors font-medium">
                    Xem chi tiết
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Values Section */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-gray-50 to-white">
        <Container>
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl flex items-center justify-center">
                <HeartIcon className="w-12 h-12 text-red-500" />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
              "ĐỒNG HÀNH CÙNG KHÁCH HÀNG"
            </h2>
            <p className="text-xl sm:text-2xl text-gray-700 font-semibold max-w-4xl mx-auto leading-relaxed">
              KHÔNG PHẢI LÀ KHẨU HIỆU – MÀ LÀ GIÁ TRỊ TÔI GIỮ GÌN SUỐT CẢ HÀNH TRÌNH
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12 xl:p-16 border border-gray-100">
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  <strong>Tôi đã sống và làm việc tại Canada 38 năm – hơn nửa đời người.</strong> Từng ngày tôi chứng kiến những nỗ lực, cả sự vất vả và hy vọng của người Việt nơi đất khách. Đó là lý do vì sao tôi chọn con đường này: không chỉ làm di trú như một công việc, mà xem nó là một phần sứ mệnh của đời mình – giúp những gia đình có được cuộc sống tốt đẹp hơn trong một đất nước công bằng.
                </p>
                
                <p>
                  Là một văn phòng luật chuyên về định cư với nhiều chi nhánh tại Canada, Mỹ và Việt Nam, luôn đặt khách hàng là trung tâm. <strong>Giá trị mà tôi và cộng sự của mình tạo ra không phải là con số bao nhiêu hồ sơ được duyệt, mà là cách chúng tôi đã ở lại cùng khách hàng trong những lúc khó khăn nhất.</strong>
                </p>
                
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border-l-4 border-blue-500">
                  <p className="font-bold text-xl text-gray-900 mb-6">Cam kết của tôi:</p>
                  <ul className="space-y-4 text-gray-800">
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckIcon className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="font-medium">Hoạt động dựa trên nền tảng đạo đức nghề nghiệp</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckIcon className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="font-medium">Tinh thần thượng tôn pháp luật và sự tử tế</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckIcon className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="font-medium">Không bao giờ bỏ cuộc để khách hàng có cuộc sống tốt đẹp hơn</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckIcon className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="font-medium">Luôn sẵn sàng lắng nghe, đối thoại và tìm cách giải quyết</span>
                    </li>
                  </ul>
                </div>
                
                <p className="text-center font-medium text-gray-900 text-lg">
                  <em>"Tôi không bao giờ khuất phục trước sự đe dọa. Tôi vẫn sẽ luôn đứng về phía công lý, đạo đức và lòng tử tế."</em>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* About Section */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="xl:col-span-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
                Về Paul Duong
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Tôi là một doanh nhân, luật sư di trú, tác giả và người chia sẻ kinh nghiệm sống tại Canada. 
                  Với 38 năm kinh nghiệm sống và làm việc tại Canada, tôi đã giúp hàng trăm gia đình 
                  thực hiện giấc mơ định cư Canada.
                </p>
                <p>
                  Thông qua nền tảng này, tôi cung cấp những tài liệu chất lượng cao, được cập nhật liên tục 
                  về các chủ đề từ định cư, du học, đến kinh doanh và phát triển cá nhân.
                </p>
                <p className="font-medium text-gray-900">
                  "Xin cảm ơn những khách hàng, đối tác và cả cộng sự đã và đang đi cùng tôi trên hành trình này. 
                  Tôi trân trọng sự tin tưởng của các bạn hơn bất kỳ điều gì."
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">38 năm tại Canada</span>
                <span className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 px-4 py-2 rounded-full text-sm font-medium">Luật sư di trú</span>
                <span className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">Campbell Group</span>
              </div>
            </div>
            <div className="relative xl:col-span-2">
              <img 
                src="/img/paul-duong-5.jpg" 
                alt="Paul Duong" 
                className="rounded-2xl shadow-2xl w-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
