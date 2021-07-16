import Head from 'next/head';
import AllPosts from '../../components/posts/all-posts';
import { getAllPosts } from '../../helpers/posts-util';

export default function AllPostsPage({ posts }) {
    return (
        <>
            <Head>
                <title>All Post</title>
                <meta name="description" content="boop-boop" />
            </Head>
            <AllPosts posts={posts} />
        </>
    );
}

export function getStaticProps() {
    const allPosts = getAllPosts();

    return {
        props: { posts: allPosts }
    }
}