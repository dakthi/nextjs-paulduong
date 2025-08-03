import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readingTime: number;
  category: string;
  quote: string;
  image: string;
  client: {
    name: string;
    job: string;
    image: string;
  };
  content: string;
  excerpt?: string;
}

export function getAllPostSlugs() {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter(name => name.endsWith('.md'))
      .map(name => name.replace(/\.md$/, ''));
  } catch (error) {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Convert markdown to HTML
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(content);
    const contentHtml = processedContent.toString();

    // Create excerpt from content (first 150 characters)
    const excerpt = content.replace(/\n/g, ' ').substring(0, 150) + '...';

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      readingTime: data.readingTime || 5,
      category: data.category || '',
      quote: data.quote || '',
      image: data.image || '/img/paul-duong-1.jpg',
      client: data.client || {
        name: 'Paul Duong',
        job: 'Tác giả',
        image: '/img/paul-duong-1.jpg'
      },
      content: contentHtml,
      excerpt
    };
  } catch (error) {
    return null;
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const slugs = getAllPostSlugs();
  const posts = await Promise.all(
    slugs.map(slug => getPostBySlug(slug))
  );
  
  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}