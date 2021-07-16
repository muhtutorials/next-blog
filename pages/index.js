import Head from 'next/head';
import Hero from '../components/home-page/hero';
import FeaturedPosts from '../components/home-page/featured-posts';
import { getFeaturedPosts } from '../helpers/posts-util';

export default function HomePage({ posts }) {
	return (
		<>
			<Head>
				<title>Terminator's Blog</title>
				<meta name="description" content="beep-beep" />
			</Head>
			<Hero />
			<FeaturedPosts posts={posts} />
		</>
	);
}

export function getStaticProps() {
    const featuredPosts = getFeaturedPosts();

    return {
        props: { posts: featuredPosts }
    }
}