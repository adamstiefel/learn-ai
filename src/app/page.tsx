

import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface Post {
  title: string;
  slug: string;
}

const Home: React.FC<{ posts: Post[] }> = ({ posts }) => {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Learn AI</h1>
        <p className="text-xl text-gray-700">
          Learn everything you need to know about AI and machine learning.
        </p>
      </header>
      <section className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg text-gray-800">
        <h2 className="text-2xl font-bold mb-4">Latest Updates</h2>
        {posts.map((post) => (
          <article key={post.slug}>
            <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
            <a href={`/blog/${post.slug}`} className="text-blue-500 hover:underline">
              Read more
            </a>
          </article>
        ))}
      </section>
    </main>
  );
}

async function getAllPosts() {
  const fs = require('fs');
  const path = require('path');
  const matter = require('gray-matter');
  
  const files = fs.readdirSync(path.join('src/posts'));
  const posts = files.map((filename: string) => {  // Explicitly state the type here
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


// This is your main exported function that fetches posts and renders the Home component
export default async function HomePage() {
  const posts = await getAllPosts();
  return <Home posts={posts} />;
}