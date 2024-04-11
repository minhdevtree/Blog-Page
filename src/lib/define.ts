export type Post = {
    id: string;
    title: string;
    summary: string;
    content: string;
    publishedAt: string;
    published: string;
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
