import axios from 'axios';
import {
    Category,
    PageMeta,
    Post,
    PostComment,
    PostDetail,
    SearchCommentParams,
    SearchPostParams,
    Tag,
    TopCreator,
    UserLoginProfile,
} from './define';
import { getCookie } from './action';

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
            .get(`/authors/top-creators`)
            .then(res => res.data.data as TopCreator[]);
    } catch (error) {
        console.error(error);
        return [] as TopCreator[];
    }
};

export const getPostDetail = async (slug: string) => {
    const sessionTokenAuthJs = await getCookie('authjs.session-token');
    return await axios
        .get(`/post/${slug}`, {
            headers: {
                Cookie: `authjs.session-token=${sessionTokenAuthJs}`,
            },
        })
        .then(res => res.data.data as PostDetail)
        .catch(error => {
            return error.response.data;
        });
};

export const getPostParentComments = async (
    postId: string,
    searchParams?: SearchCommentParams
) => {
    if (!searchParams) {
        searchParams = {
            page: 1,
            pageSize: 5,
        };
    }
    try {
        const { comments, pageMeta } = await axios
            .get(`/post/${postId}/comments`, {
                params: searchParams,
            })
            .then(res => {
                return {
                    comments: res.data.data.comments as PostComment[],
                    pageMeta: res.data.data.pageMeta as PageMeta,
                };
            });
        return { comments, pageMeta };
    } catch (error) {
        return {
            comments: [] as PostComment[],
            pageMeta: pageMetaDefault as PageMeta,
        };
    }
};

export const getPostChildComments = async (
    postId: string,
    parentId: string,
    searchParams?: SearchCommentParams
) => {
    if (!searchParams) {
        searchParams = {
            page: 1,
            pageSize: 5,
        };
    }
    try {
        const { comments, pageMeta } = await axios
            .get(`/post/${postId}/comments/${parentId}`, {
                params: searchParams,
            })
            .then(res => {
                return {
                    comments: res.data.data.comments as PostComment[],
                    pageMeta: res.data.data.pageMeta as PageMeta,
                };
            });
        return { comments, pageMeta };
    } catch (error) {
        return {
            comments: [] as PostComment[],
            pageMeta: pageMetaDefault as PageMeta,
        };
    }
};

export async function isLikedComment(commentId: string) {
    const sessionTokenAuthJs = await getCookie('authjs.session-token');
    try {
        return await axios
            .get(`/comment/${commentId}/like`, {
                headers: {
                    Cookie: `authjs.session-token=${sessionTokenAuthJs}`,
                },
            })
            .then(res => res.data.data.like as boolean)
            .catch(() => false);
    } catch (error) {
        return false;
    }
}

export async function isLikedPost(postId: string) {
    const sessionTokenAuthJs = await getCookie('authjs.session-token');
    try {
        return await axios
            .get(`/post/${postId}/like`, {
                headers: {
                    Cookie: `authjs.session-token=${sessionTokenAuthJs}`,
                },
            })
            .then(res => res.data.data.like as boolean)
            .catch(() => false);
    } catch (error) {
        return false;
    }
}

export async function isFollowedUser(userId: string) {
    const sessionTokenAuthJs = await getCookie('authjs.session-token');
    try {
        return await axios
            .get(`/user/${userId}/follow`, {
                headers: {
                    Cookie: `authjs.session-token=${sessionTokenAuthJs}`,
                },
            })
            .then(res => res.data.data.isFollowed as boolean)
            .catch(() => false);
    } catch (error) {
        return false;
    }
}

export async function isBookmarkedPost(postId: string) {
    const sessionTokenAuthJs = await getCookie('authjs.session-token');
    try {
        return await axios
            .get(`/post/${postId}/bookmark`, {
                headers: {
                    Cookie: `authjs.session-token=${sessionTokenAuthJs}`,
                },
            })
            .then(res => res.data.data.isBookmark as boolean)
            .catch(() => false);
    } catch (error) {
        return false;
    }
}

export async function getUserLoginProfile() {
    const sessionTokenAuthJs = await getCookie('authjs.session-token');
    try {
        return await axios
            .get(`/user/profile`, {
                headers: {
                    Cookie: `authjs.session-token=${sessionTokenAuthJs}`,
                },
            })
            .then(res => res.data.data as UserLoginProfile);
    } catch (error) {
        return {} as UserLoginProfile;
    }
}

// Demo purpose
export async function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
