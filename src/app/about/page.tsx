import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";

export default function AboutPage() {
  return (
    <div className="px-2 py-8 sm:px-4 sm:py-12 lg:px-8 lg:py-16 bg-white">
      <Container>
        <SectionTitle title="Về Paul Duong">
          Doanh nhân, luật sư di trú và tác giả chia sẻ kinh nghiệm sống tại Canada
        </SectionTitle>
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center mt-8 sm:mt-12 lg:mt-16">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Chào mừng đến với vũ trụ nhỏ của tôi!
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Tôi hy vọng con đường của chúng ta sẽ giao nhau, cho phép chúng ta chia sẻ và tìm hiểu về nhau trong hành trình này.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Business is my life, but inspiring others is my passion. I motivate people for the same reason that I breathe: to live.
            </p>
            <blockquote className="text-xl italic text-blue-600 border-l-4 border-blue-600 pl-6">
              "There's no shortage of remarkable ideas, what's missing is the will to execute them."
              <cite className="block text-base text-gray-600 mt-2">- Seth Godin</cite>
            </blockquote>
          </div>
          <div className="relative">
            <img 
              src="/img/paul-duong-6.jpg" 
              alt="Paul Duong" 
              className="rounded-lg shadow-xl w-full object-cover"
            />
          </div>
        </div>

        {/* Professional Experience */}
        <section className="mt-12 sm:mt-16 lg:mt-20">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Kinh nghiệm nghề nghiệp</h3>
          <div className="space-y-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">Senior Partner</h4>
                  <p className="text-blue-600 font-medium">Campbell Group</p>
                </div>
                <span className="text-gray-500">2018 – Present</span>
              </div>
              <ul className="text-gray-700 space-y-2">
                <li>• Provide visionary leadership for a multi-million company</li>
                <li>• Present ideas and objectives to business in Canada, United States, Vietnam, China and Hong Kong</li>
                <li>• Deliver outstanding growth from $150,000 to $10 million in 10 years</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">Executive Director</h4>
                  <p className="text-blue-600 font-medium">Campbell Group</p>
                </div>
                <span className="text-gray-500">2011 – 2018</span>
              </div>
              <ul className="text-gray-700 space-y-2">
                <li>• Design and implemented high quality product development</li>
                <li>• Expanded additional business line and saw an increase in 110% of revenue</li>
                <li>• Oversaw the development of new line of higher quality services</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="mt-12 sm:mt-16">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Học vấn</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-gray-900 mb-2">MBA</h4>
              <p className="text-blue-600 font-medium mb-2">Executive Master Business Administration</p>
              <p className="text-gray-600">Quantic School of Business and Technology</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-gray-900 mb-2">B.Sc.</h4>
              <p className="text-green-600 font-medium mb-2">Management Information System</p>
              <p className="text-gray-600">National American University</p>
            </div>
          </div>
        </section>

        {/* Core Competencies */}
        <section className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Chuyên môn cốt lõi</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "Canada Immigration Law & Regulation",
              "Visionary Leadership", 
              "Capital Raising",
              "Research & Development",
              "Budget Management",
              "Sales Development",
              "Public & Media Relations",
              "Partnership Development",
              "Social Media Influencer",
              "EB5 Programs"
            ].map((skill) => (
              <div key={skill} className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-sm font-medium text-gray-700">{skill}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Recognition & Achievements */}
        <section className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Thành tích & Ghi nhận</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">M</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Full Marathon Finisher</h4>
              <p className="text-gray-600 text-sm">Hoàn thành marathon đầy đủ</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold">A</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Published Author</h4>
              <p className="text-gray-600 text-sm">Tác giả đã xuất bản sách</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold">L</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Immigration Law Practitioner</h4>
              <p className="text-gray-600 text-sm">Luật sư di trú Canada</p>
            </div>
          </div>
        </section>

        {/* Personal Touch */}
        <section className="mt-16 bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Câu chuyện cá nhân</h3>
          <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
            Tôi là một doanh nhân, luật sư di trú, tác giả, người cha, người chồng, người con, người chú, 
            người lãnh đạo, người học hỏi, người yêu thương, và quan trọng nhất là một người bạn. 
            Với hơn 10 năm kinh nghiệm trong lĩnh vực luật di trú và kinh doanh, tôi đã giúp hàng trăm 
            gia đình thực hiện giấc mơ định cư Canada và xây dựng cuộc sống mới.
          </p>
        </section>

        {/* Contact Information */}
        <section className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Liên hệ với tôi</h3>
          <div className="flex justify-center space-x-6">
            <a href="mailto:duongtp08@gmail.com" className="text-blue-600 hover:text-blue-800 transition">
              duongtp08@gmail.com
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-800 transition">
              Facebook
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-800 transition">
              YouTube
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-800 transition">
              TikTok
            </a>
          </div>
        </section>
      </Container>
    </div>
  );
}
