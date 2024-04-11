import axios from 'axios';
import { Category, Post, Tag, TopCreator } from './define';

axios.defaults.baseURL = process.env.API_URL;

export const getPosts = async (
    limit: number,
    published: string,
    sort: string
) => {
    try {
        return await axios.get(`/posts`).then(res => res.data.data as Post[]);
    } catch (error) {
        console.error(error);
        return [] as Post[];
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

// Demo purpose
export async function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
