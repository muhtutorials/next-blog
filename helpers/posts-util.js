import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'posts');

export function getPostsFiles() {
    return fs.readdirSync(postsDir);
}

// get post with a slug or filename
export function getPostData(postIdentifier) {
    const postSlug = postIdentifier.replace(/\.md$/, '');  // remove extension

    const filePath = path.join(postsDir, `${postSlug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    return { slug: postSlug, ...data, content };
}

export function getAllPosts() {
    const postFiles = getPostsFiles();

    const allPosts = postFiles.map(postFile => getPostData(postFile));

    return allPosts.sort((a, b) => a.date > b.date ? -1 : 1);
}

export function getFeaturedPosts() {
    const allPosts = getAllPosts();

    return allPosts.filter(post => post.isFeatured);
}