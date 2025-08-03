import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { getAllPosts } from "@/lib/blog";
import Link from "next/link";

// Get blog posts from markdown files only
async function getBlogPosts() {
  const posts = await getAllPosts();
  return posts;
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  const categories = ["Tất cả", "Di Trú", "Kinh nghiệm cá nhân", "Giáo dục", "Công nghệ", "Tài chính", "Kinh doanh"];
  return (
    <div className="px-2 py-8 sm:px-4 sm:py-12 lg:px-8 lg:py-16">
      <Container>
        <SectionTitle title="Blog của Paul Duong">
          Chia sẻ kinh nghiệm, kiến thức và những suy ngẫm về cuộc sống tại Canada
        </SectionTitle>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-8 sm:mt-12 mb-6 sm:mb-8">
          {categories.map((category) => (
            <button
              key={category}
              className="px-6 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {blogPosts.length > 0 && (
          <div className="mb-12 sm:mb-16">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg overflow-hidden text-white">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="inline-block bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium mb-4 w-fit">
                    Bài viết nổi bật
                  </span>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-blue-100 mb-6 text-lg">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-blue-200">{blogPosts[0].date}</span>
                    <span className="text-blue-200">•</span>
                    <span className="text-blue-200">{blogPosts[0].readingTime} phút đọc</span>
                  </div>
                  <Link 
                    href={`/blog/${blogPosts[0].slug}`}
                    className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors w-fit border border-gray-300"
                  >
                    Đọc bài viết →
                  </Link>
                </div>
                <div className="h-64 lg:h-auto">
                  <img 
                    src={blogPosts[0].image} 
                    alt={blogPosts[0].title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        {blogPosts.length > 1 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {blogPosts.slice(1).map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{post.date}</span>
                  <span>{post.readingTime} phút đọc</span>
                </div>
                
                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
                >
                  Đọc tiếp →
                </Link>
              </div>
            </article>
            ))}
          </div>
        ) : blogPosts.length === 1 ? null : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Chưa có bài viết nào
            </h3>
            <p className="text-gray-600 mb-8">
              Hãy quay lại sau để đọc những bài viết mới nhất từ Paul Duong
            </p>
            <Link 
              href="/documents"
              className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Xem tài liệu
            </Link>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-12 sm:mt-16 lg:mt-20 bg-gray-50 rounded-lg p-6 sm:p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Đăng ký nhận bài viết mới
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Nhận thông báo về những bài viết mới nhất về định cư Canada, kinh doanh và phát triển cá nhân
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Đăng ký
            </button>
          </div>
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium">
            Tải thêm bài viết
          </button>
        </div>
      </Container>
    </div>
  );
}