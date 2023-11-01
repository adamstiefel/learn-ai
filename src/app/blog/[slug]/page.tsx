import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import React from 'react'
import ReactDOM from 'react-dom'
import ReactMarkdown from 'react-markdown';




interface PostData {
  title: string;
  [key: string]: any;
}

interface PostContentProps {
  post: { content: string, data: PostData };
}

const PostPage: React.FC<PostContentProps> = ({ post }) => {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="prose prose-lg mx-auto">
          <h1 className="text-5xl font-extrabold mb-4 text-center">{post.data.title}</h1>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="prose prose-lg mx-auto">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    );
  };
  

async function getPostData(slug: string) {
  const markdownWithMeta = fs.readFileSync(path.join('src/posts', `${slug}.md`), 'utf-8');
  const matterResult = matter(markdownWithMeta);
  const data = matterResult.data as PostData;
  const content = matterResult.content;

  // Ensure data has a title property
  if (typeof data.title !== 'string') {
    throw new Error('Post data missing title');
  }

  return { data, content };
}

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getPostData(params.slug);
  return <PostPage post={post} />;
}
