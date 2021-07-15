import PostContent from '../../components/posts/post-detail/post-content';
import { getPostData, getPostsFiles } from '../../helpers/posts-util';

export default function PostDetailPage({ post }) {
    return <PostContent post={post} />
}

export function getStaticProps(context) {
    const slug = context.params.slug;

    const post = getPostData(slug);

    return {
        props: { post },
        revalidate: 600
    }
}

export function getStaticPaths() {
    const postFilenames = getPostsFiles();

    const slugs = postFilenames.map(filename => filename.replace(/\.md$/, ''));

    return {
        paths: slugs.map(slug => ({ params: { slug } })),
        fallback: false
    }
}
