import { Container } from "@/components/Container";
import { getPostBySlug, getAllPostSlugs } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="py-20 bg-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/blog" className="hover:text-gray-900">Blog</Link>
              <span>›</span>
              <span className="text-gray-900">{post.title}</span>
            </div>
          </nav>

          {/* Article Header */}
          <article>
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
                <span className="text-gray-600 text-sm">
                  {post.readingTime} phút đọc
                </span>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>
              
              {post.quote && (
                <blockquote className="text-xl text-gray-700 italic leading-relaxed mb-6 pl-6 border-l-4 border-gray-300">
                  "{post.quote}"
                </blockquote>
              )}

              <div className="flex items-center gap-4 mb-8">
                <img 
                  src={post.client.image}
                  alt={post.client.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900">{post.client.name}</p>
                  <p className="text-sm text-gray-600">{post.client.job}</p>
                </div>
                <div className="ml-auto text-sm text-gray-600">
                  {post.date}
                </div>
              </div>
            </header>

            {/* Featured Image */}
            {post.image && (
              <div className="mb-8">
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            )}

            {/* Article Content */}
            <div 
              className="prose prose-lg prose-gray max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Article Footer */}
            <footer className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img 
                    src={post.client.image}
                    alt={post.client.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{post.client.name}</h3>
                    <p className="text-gray-600">{post.client.job}</p>
                    <p className="text-sm text-gray-500">
                      Luật sư di trú với 38 năm kinh nghiệm tại Canada
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Link 
                    href="/contact"
                    className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
                  >
                    Liên hệ tư vấn
                  </Link>
                  <Link 
                    href="/documents"
                    className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition"
                  >
                    Xem tài liệu
                  </Link>
                </div>
              </div>
            </footer>
          </article>

          {/* Related Posts */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Bài viết liên quan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link href="/blog" className="group">
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <img 
                    src="/img/paul-duong-2.jpg"
                    alt="Related post"
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-600">
                      Kinh nghiệm định cư Canada
                    </h3>
                    <p className="text-sm text-gray-600">
                      Những chia sẻ thực tế về quá trình định cư...
                    </p>
                  </div>
                </div>
              </Link>
              <Link href="/blog" className="group">
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <img 
                    src="/img/paul-duong-3.jpg"
                    alt="Related post"
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-600">
                      Tư vấn du học Canada
                    </h3>
                    <p className="text-sm text-gray-600">
                      Hướng dẫn chi tiết về quy trình du học...
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}