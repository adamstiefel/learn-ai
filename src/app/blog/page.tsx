import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import React from 'react';

interface Post {
  title: string;
  slug: string;
}

interface BlogIndexProps {
  posts: Post[];
}

const BlogIndex: React.FC<BlogIndexProps> = ({ posts }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Blog</h1>
      <ul>
        {posts.map(post => (
          <li key={post.slug} className="mb-4">
            <Link href={`/blog/${post.slug}`} className="text-blue-500 hover:underline">
            {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

async function getPosts() {
  const files = fs.readdirSync(path.join('src/posts'));
  const posts = files.map(filename => {
    const slug = filename.replace('.md', '');
    const markdownWithMeta = fs.readFileSync(path.join('src/posts', filename), 'utf-8');
    const { data } = matter(markdownWithMeta);

    return {
      title: data.title,
      slug,
    };
  });
  return posts;
}

export default async function Blog() {
  const posts = await getPosts();
  return <BlogIndex posts={posts} />;
}
