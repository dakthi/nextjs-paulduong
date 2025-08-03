import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { DocumentIcon, GraduationIcon, BriefcaseIcon, GlobeIcon, HeartIcon, CheckIcon } from "@/components/Icons";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative px-2 py-8 sm:px-4 sm:py-12 lg:py-20 xl:py-24 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <img 
                src="/img/paul-duong-1.jpg" 
                alt="Paul Duong" 
                className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full border-4 border-gray-200 shadow-lg object-cover"
              />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4">
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
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a href="/documents" className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-center">
                Tài liệu của tôi
              </a>
              <a href="/contact" className="border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-colors text-center">
                Liên hệ tư vấn
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Services Section */}
      <section className="px-2 py-8 sm:px-4 sm:py-12 lg:py-16 bg-white">
        <Container>
          <SectionTitle title="Dịch vụ của tôi">
            Cung cấp tài liệu và tư vấn chuyên nghiệp về định cư Canada
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-12">
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DocumentIcon className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Tài liệu định cư</h3>
              <p className="text-gray-600">
                Bộ sưu tập tài liệu hướng dẫn định cư Canada chi tiết và cập nhật
              </p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationIcon className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Kinh nghiệm du học</h3>
              <p className="text-gray-600">
                Chia sẻ hành trình du học và các mẹo thành công tại Canada
              </p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BriefcaseIcon className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Tư vấn kinh doanh</h3>
              <p className="text-gray-600">
                Hướng dẫn khởi nghiệp và phát triển kinh doanh tại Canada
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Documents Section */}
      <section className="px-2 py-8 sm:px-4 sm:py-12 lg:py-16 bg-white">
        <Container>
          <SectionTitle title="Tài liệu nổi bật">
            Những tài liệu được quan tâm và tải xuống nhiều nhất
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img src="/img/paul-duong-2.jpg" alt="Du học Canada" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Hướng dẫn xin giấy phép du học Canada</h3>
                <p className="text-gray-600 mb-4">Tài liệu chi tiết về quy trình xin visa du học Canada</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-semibold">$3.99</span>
                  <a href="/documents/1" className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800">
                    Xem chi tiết
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img src="/img/paul-duong-3.jpg" alt="Hội nhập Canada" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Bí quyết hội nhập thành công vào cuộc sống Canada</h3>
                <p className="text-gray-600 mb-4">Những kinh nghiệm thực tế để hội nhập nhanh chóng</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-semibold">$4.99</span>
                  <a href="/documents/2" className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800">
                    Xem chi tiết
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img src="/img/paul-duong-4.jpg" alt="Bidong Novel" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Bidong, a novel</h3>
                <p className="text-gray-600 mb-4">Tiểu thuyết về hành trình của những người tị nạn thuyền nhân</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-semibold">$4.99</span>
                  <a href="/documents/3" className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800">
                    Xem chi tiết
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow xl:block hidden">
              <img src="/img/paul-duong-6.jpg" alt="Định cư Canada" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Cẩm nang định cư Canada diện tay nghề</h3>
                <p className="text-gray-600 mb-4">Hướng dẫn toàn diện về chương trình định cư</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-semibold">$4.99</span>
                  <a href="/documents/4" className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800">
                    Xem chi tiết
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Values Section */}
      <section className="px-2 py-8 sm:px-4 sm:py-12 lg:py-16 xl:py-20 bg-white">
        <Container>
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="flex justify-center mb-6">
              <HeartIcon className="w-16 h-16 text-red-500" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              "ĐỒNG HÀNH CÙNG KHÁCH HÀNG"
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 font-medium">
              KHÔNG PHẢI LÀ KHẨU HIỆU – MÀ LÀ GIÁ TRỊ TÔI GIỮ GÌN SUỐT CẢ HÀNH TRÌNH
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 xl:p-12 border border-gray-200">
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  <strong>Tôi đã sống và làm việc tại Canada 38 năm – hơn nửa đời người.</strong> Từng ngày tôi chứng kiến những nỗ lực, cả sự vất vả và hy vọng của người Việt nơi đất khách. Đó là lý do vì sao tôi chọn con đường này: không chỉ làm di trú như một công việc, mà xem nó là một phần sứ mệnh của đời mình – giúp những gia đình có được cuộc sống tốt đẹp hơn trong một đất nước công bằng.
                </p>
                
                <p>
                  Là một văn phòng luật chuyên về định cư với nhiều chi nhánh tại Canada, Mỹ và Việt Nam, luôn đặt khách hàng là trung tâm. <strong>Giá trị mà tôi và cộng sự của mình tạo ra không phải là con số bao nhiêu hồ sơ được duyệt, mà là cách chúng tôi đã ở lại cùng khách hàng trong những lúc khó khăn nhất.</strong>
                </p>
                
                <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-gray-400">
                  <p className="font-semibold text-gray-900 mb-2">Cam kết của tôi:</p>
                  <ul className="space-y-2 text-gray-800">
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-green-600" />
                      <span>Hoạt động dựa trên nền tảng đạo đức nghề nghiệp</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-green-600" />
                      <span>Tinh thần thượng tôn pháp luật và sự tử tế</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-green-600" />
                      <span>Không bao giờ bỏ cuộc để khách hàng có cuộc sống tốt đẹp hơn</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-green-600" />
                      <span>Luôn sẵn sàng lắng nghe, đối thoại và tìm cách giải quyết</span>
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
      <section className="px-2 py-8 sm:px-4 sm:py-12 lg:py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="xl:col-span-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
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
              <div className="mt-6 flex gap-4">
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">38 năm tại Canada</span>
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">Luật sư di trú</span>
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">Campbell Group</span>
              </div>
            </div>
            <div className="relative xl:col-span-2">
              <img 
                src="/img/paul-duong-5.jpg" 
                alt="Paul Duong" 
                className="rounded-lg shadow-xl w-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
