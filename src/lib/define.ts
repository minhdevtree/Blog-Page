export type Post = {
    id: string;
    title: string;
    summary: string;
    content: string;
    publishedAt: string;
    published: string;
    createdAt?: string;
    slug: string;
    author: {
        id: string;
        fullName: string;
        img: string;
        username: string;
    };
    categories: [
        {
            id: string;
            title: string;
            slug: string;
        }
    ];
    tags: [
        {
            id: string;
            title: string;
            slug: string;
        }
    ];
    metas: [
        {
            id: string;
            key: string;
            value: string;
        }
    ];
};

export type PostDetail = {
    id: string;
    title: string;
    summary: string;
    content: string;
    publishedAt: string;
    published: string;
    metas: MetaPostDetail[];
    categories: [
        {
            id: string;
            title: string;
            slug: string;
        }
    ];
    tags: [
        {
            id: string;
            title: string;
            slug: string;
        }
    ];
    author: AuthorPostDetail;
    _count: {
        comments: number;
        likes: number;
    };
    children: ChildPostDetail[];
};

export type ChildPostDetail = {
    id: string;
    title: string;
    content: string;
    order: number;
    metas: [
        {
            key: string;
            value: string;
        }
    ];
};

export type MetaPostDetail = {
    key: string;
    value: string;
};

export type AuthorPostDetail = {
    id: string;
    fullName: string;
    img: string;
    username: string;
    _count: {
        posts: number;
        followers: number;
    };
};

export type Category = {
    id: string;
    title: string;
    slug: string;
    content: string;
    children: Subcategory[];
};

export type Subcategory = {
    id: string;
    parentId: string;
    title: string;
    content: string;
    slug: string;
};

export type ApiRequestInfo = {
    time: string;
    apiName: string;
    method: string;
    requestUrl: string;
    clientIp: string;
};

export type Tag = {
    id: string;
    title: string;
    slug: string;
    _count: {
        posts: number;
    };
};

export type TopCreator = {
    id: string;
    username: string;
    img: string;
    fullName: string;
};

export type PageMeta = {
    totalPages: number;
    page: number;
    totalElements: number;
    pageSize: number;
    hasNext: boolean;
    hasPrev: boolean;
};

export type BreadItem = {
    title: string;
    url: string;
    active: boolean;
};

export type SearchPostParams = {
    sort?: string;
    page?: number;
    pageSize?: number;
    published?: string;
};

export type SearchCommentParams = {
    page?: number;
    pageSize?: number;
};

export type PostComment = {
    id: string;
    content: string;
    createdAt: string;
    _count: {
        children: number;
        likes: number;
    };
    user: {
        id: string;
        fullName: string;
        username: string;
        img: string;
    };
};

export enum SearchParams {
    SORT = 'sort',
    PAGE = 'page',
    PER_PAGE = 'perPage',
    MODE = 'mode',
}

export type SortOption = {
    label: string;
    value: string;
    field: string;
};

export type FilterOption = {
    label: string;
    value: string;
    field: string;
};

export type UserLoginProfile = {
    fullName: string;
    username: string;
    email: string;
    phoneNumber: any;
    intro: any;
    img: string;
    role: string;
    loginType: string;
    urls: [
        {
            url: string;
        }
    ];
};

export type createSubPost = {
    title: string;
    content: string;
    image?: any;
};

export type CustomSession = {
    user: {
        id: string;
        fullName: string;
        username: string;
        email: string;
        img: string;
        role: string;
        loginType: string;
    };
    expires: string;
    accessToken: string;
};

export enum RoleType {
    ADMIN,
    USER,
    WRITER,
}

export enum LoginType {
    LOCAL,
    GOOGLE,
    GITHUB,
}

export enum StatusType {
    ACTIVE,
    BANNED,
    DELETED,
}

export enum PublishedType {
    DRAFT,
    PUBLISHED_ALL,
    PUBLISHED_SUBSCRIBERS,
    PRIVATE,
    DELETED,
}

export enum KeyType {
    IMG,
    CODE,
    LINK,
}
