import { auth } from '@/lib/auth';
import { ApiRequestInfo } from '@/lib/define';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getDateFormatted } from '@/lib/utils';
import { KeyType, PublishedType, UserLimitType } from '@prisma/client';
import { createPostSchema } from '@/lib/form-schema';
import slugify from 'slugify';

const currentTime = getDateFormatted(new Date().toISOString());
const apiRequestInfo = {
    time: currentTime,
    apiName: 'Create Post',
    method: 'POST',
    requestUrl: '/api/post/create',
    clientIp: 'Unknown',
} as ApiRequestInfo;

export const POST = async (request: NextRequest) => {
    apiRequestInfo.method = 'POST';

    apiRequestInfo.clientIp =
        request.ip || request.headers.get('X-Forwarded-For') || 'Unknown';

    const session = await auth();

    const isLimit =
        (await prisma.userLimit.findFirst({
            where: {
                userId: session?.user?.id,
                limit: UserLimitType.UP_POST,
            },
        })) !== null;

    if (isLimit) {
        return NextResponse.json(
            {
                apiRequestInfo,
                data: {
                    error: 'Tài khoản của bạn đã bị hạn chế đăng bài viết',
                },
            },
            { status: 403 }
        );
    }

    // defaultValues: {
    //     title: '',
    //     summary: '',
    //     content: '',
    //     image: '',
    //     tags: [],
    //     categories: [],
    //     published: PublishedType.DRAFT,
    //     subPosts: [] as createSubPost[],
    // },

    try {
        const body = await request.json();
        const {
            title,
            summary,
            content,
            image,
            tags,
            categories,
            published,
            subPosts,
        } = createPostSchema.parse(body);

        for (const tag of tags) {
            const tagExists = await prisma.tag.findFirst({
                where: { title: tag },
            });
            if (!tagExists) {
                let slug = slugify(tag, {
                    replacement: '-', // replace spaces with replacement character, defaults to `-`
                    remove: undefined, // remove characters that match regex, defaults to `undefined`
                    lower: true, // convert to lower case, defaults to `false`
                    strict: false, // strip special characters except replacement, defaults to `false`
                    locale: 'vi', // language code of the locale to use
                    trim: true, // trim leading and trailing replacement chars, defaults to `true`
                });
                const slugExists = await prisma.tag.findFirst({
                    where: { slug },
                });
                if (slugExists) {
                    slug = `${slug}-${Math.random()
                        .toString(36)
                        .substring(7)
                        .toString()}`;
                }
                await prisma.tag.create({ data: { title: tag, slug } });
            }
        }

        let postSlug = slugify(title, {
            replacement: '-', // replace spaces with replacement character, defaults to `-`
            remove: undefined, // remove characters that match regex, defaults to `undefined`
            lower: true, // convert to lower case, defaults to `false`
            strict: false, // strip special characters except replacement, defaults to `false`
            locale: 'vi', // language code of the locale to use
            trim: true, // trim leading and trailing replacement chars, defaults to `true`
        });

        const postSlugExists = await prisma.post.findFirst({
            where: { slug: postSlug },
        });

        if (postSlugExists) {
            postSlug = `${postSlug}-${Math.random()
                .toString(36)
                .substring(7)
                .toString()}`;
        }

        const post = await prisma.post.create({
            data: {
                title,
                summary,
                content,
                published,
                authorId: session?.user?.id,
                publishedAt:
                    published === PublishedType.PUBLISHED_ALL ||
                    published === PublishedType.PUBLISHED_SUBSCRIBERS
                        ? new Date()
                        : null,
                order: 0,
                slug: postSlug,
            },
        });

        await prisma.postMeta.create({
            data: {
                postId: post.id,
                key: KeyType.IMG,
                value: image,
            },
        });

        for (const tag of tags) {
            const existingTag = await prisma.tag.findFirst({
                where: { title: tag },
            });

            if (existingTag) {
                await prisma.tag.update({
                    where: { id: existingTag.id },
                    data: {
                        posts: {
                            connect: { id: post.id },
                        },
                    },
                });
            }
        }

        for (const category of categories) {
            const existingCategory = await prisma.category.findFirst({
                where: { id: category },
            });

            if (existingCategory) {
                await prisma.category.update({
                    where: { id: existingCategory.id },
                    data: {
                        posts: {
                            connect: { id: post.id },
                        },
                    },
                });
            }
        }

        if (subPosts) {
            let order = 1;
            for (const subPost of subPosts) {
                const sub = await prisma.post.create({
                    data: {
                        title: subPost.title,
                        content: subPost.content,
                        parentId: post.id,
                        order: order++,
                    },
                });
                // Add image to postmeta
                if (subPost.image) {
                    await prisma.postMeta.create({
                        data: {
                            postId: sub.id,
                            key: KeyType.IMG,
                            value: subPost.image,
                        },
                    });
                }
            }
        }
        return NextResponse.json(
            {
                apiRequestInfo,
                data: {
                    message: 'Bài viết đã được tạo thành công',
                    post: post,
                },
            },
            { status: 500 }
        );
    } catch {
        return NextResponse.json(
            {
                apiRequestInfo,
                data: { error: 'Đã xảy ra lỗi khi tạo bài viết' },
            },
            { status: 500 }
        );
    }
};
