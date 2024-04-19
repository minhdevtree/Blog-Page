import axios from 'axios';
import {
    Category,
    PageMeta,
    Post,
    PostComment,
    PostDetail,
    SearchPostParams,
    Tag,
    TopCreator,
} from './define';

axios.defaults.baseURL = process.env.API_URL;

const pageMetaDefault = {
    totalPages: 0,
    page: 0,
    pageSize: 0,
    hasNext: false,
    hasPrev: false,
} as PageMeta;

export const getPosts = async (searchParams: SearchPostParams) => {
    try {
        const { posts, pageMeta } = await axios
            .get('/posts', { params: searchParams })
            .then(res => {
                return {
                    posts: res.data.data.posts as Post[],
                    pageMeta: res.data.data.pageMeta as PageMeta,
                };
            });
        return { posts, pageMeta };
    } catch (error) {
        return {
            posts: [] as Post[],
            pageMeta: pageMetaDefault as PageMeta,
        };
    }
};

export const getPopularPosts = async () => {
    try {
        return await axios
            .get(`/posts/popular-posts`)
            .then(res => res.data.data as Post[]);
    } catch (error) {
        console.error(error);
        return [] as Post[];
    }
};

export const getPostsByCategory = async (
    slug: string,
    searchParams: SearchPostParams
) => {
    try {
        const { posts, pageMeta } = await axios
            .get(`/posts/category/${slug}`, { params: searchParams })
            .then(res => {
                return {
                    posts: res.data.data.posts as Post[],
                    pageMeta: res.data.data.pageMeta as PageMeta,
                };
            });
        return { posts, pageMeta };
    } catch (error) {
        return {
            posts: [] as Post[],
            pageMeta: pageMetaDefault as PageMeta,
        };
    }
};

export const getPostsByTag = async (
    slug: string,
    searchParams: SearchPostParams
) => {
    try {
        const { posts, pageMeta } = await axios
            .get(`/posts/tag/${slug}`, { params: searchParams })
            .then(res => {
                return {
                    posts: res.data.data.posts as Post[],
                    pageMeta: res.data.data.pageMeta as PageMeta,
                };
            });
        return { posts, pageMeta };
    } catch (error) {
        return {
            posts: [] as Post[],
            pageMeta: pageMetaDefault as PageMeta,
        };
    }
};

export const getCategories = async () => {
    try {
        return await axios
            .get(`/categories`)
            .then(res => res.data.data as Category[]);
    } catch (error) {
        console.error(error);
        return [] as Category[];
    }
};

export const getPopularTags = async (limit?: number) => {
    if (!limit) {
        limit = 5;
    }
    try {
        return await axios
            .get(`/tags/popular-tags?limit=${limit}`)
            .then(res => res.data.data as Tag[]);
    } catch (error) {
        console.error(error);
        return [] as Tag[];
    }
};

export const getUserByEmail = async ({ email }: { email: string }) => {
    try {
        return await axios.get(`/users/${email}`).then(res => res.data.data);
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getTopCreators = async () => {
    try {
        return await axios
            .get(`/author/top-creators`)
            .then(res => res.data.data as TopCreator[]);
    } catch (error) {
        console.error(error);
        return [] as TopCreator[];
    }
};

export const getPostDetail = async (slug: string) => {
    try {
        return await axios
            .get(`/post/${slug}`)
            .then(res => res.data.data as PostDetail);
    } catch (error) {
        return {} as PostDetail;
    }
};

export const getPostParentComments = async (postId: string) => {
    try {
        return await axios
            .get(`/post/${postId}/comments`)
            .then(res => res.data.data as PostComment[]);
    } catch (error) {
        return [] as PostComment[];
    }
};

// Demo purpose
export async function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
