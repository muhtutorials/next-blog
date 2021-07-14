import FeaturedPosts from '../components/home-page/featured-posts';
import Hero from '../components/home-page/hero';

const DUMMY_POSTS = [
    {
        slug: 'i-terminate-humans',
        title: 'I terminate humans',
        image: 't-1.jpg',
        excerpt: 'Hasta la vista, baby',
        date: '2021-08-23'
    },
    {
        slug: 'i-protect-john-connor',
        title: 'I protect John Connor',
        image: 't-2.jpg',
        excerpt: 'I\'ll be back',
        date: '2021-08-25'
    },
    {
        slug: 'i-come-from-future',
        title: 'I come from future',
        image: 't-3.jpg',
        excerpt: 'Get down',
        date: '2021-08-28'
    }
];

export default function HomePage() {
    return (
        <>
            <Hero />
            <FeaturedPosts posts={DUMMY_POSTS} />
        </>
    );
}