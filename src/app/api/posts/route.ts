import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ApiRequestInfo } from '@/lib/define';
import getClientIp from 'get-client-ip';

const currentTime = new Date().toISOString();
const apiRequestInfo = {
    time: currentTime,
    apiName: 'Get posts',
    method: 'GET',
    requestUrl: '/api/posts',
    clientIp: 'Unknown',
} as ApiRequestInfo;

export const GET = async (request: NextRequest, response: NextResponse) => {
    try {
        // Get searchParams from request
        const limit = request.nextUrl.searchParams.get('limit');
        const sort = request.nextUrl.searchParams.get('sort');
        const published = request.nextUrl.searchParams.get('published');

        // const session = await auth();
        // if (!session) {
        //     return NextResponse.json(
        //         {
        //             apiRequestInfo,
        //             data: {
        //                 error: 'Unauthorize',
        //             },
        //         },
        //         { status: 400 }
        //     );
        // }

        // Validate searchParams
        try {
            if (limit) {
                return;
            }
            const parsedLimit = parseInt(limit || '');
            if (parsedLimit < 1 || parsedLimit >= 10) {
                return NextResponse.json(
                    {
                        apiRequestInfo,
                        data: {
                            error: 'Search param limit must be greater than 0 and smaller than 10',
                        },
                    },
                    { status: 400 }
                );
            }
        } catch {
            return NextResponse.json(
                {
                    apiRequestInfo,
                    data: { error: 'Search param limit must be number' },
                },
                { status: 400 }
            );
        }
        if (sort !== 'asc' && sort !== 'desc' && sort !== null) {
            return NextResponse.json(
                {
                    apiRequestInfo,
                    data: {
                        error: 'Search param sort must be asc or desc',
                    },
                },
                { status: 400 }
            );
        }

        // Get client IP
        const ip = getClientIp(request);
        apiRequestInfo.clientIp = ip || 'Unknown';

        // Get all posts from database
        const posts = await prisma.post.findMany({
            // where: { published: PublishedType.PUBLISHED_ALL },
            orderBy: { publishedAt: sort === 'asc' ? 'asc' : 'desc' },
            take: limit ? parseInt(limit) : 10,
            select: {
                id: true,
                title: true,
                summary: true,
                content: true,
                publishedAt: true,
                published: true,
                slug: true,
                author: {
                    select: {
                        id: true,
                        fullName: true,
                        img: true,
                        username: true,
                    },
                },
                categories: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                    },
                },
                tags: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                    },
                },
                metas: {
                    select: {
                        id: true,
                        key: true,
                        value: true,
                    },
                },
            },
        });

        return NextResponse.json({ apiRequestInfo, data: posts });
    } catch (err) {
        return NextResponse.json(
            { apiRequestInfo, data: { error: 'Fail to fetch posts' } },
            { status: 500 }
        );
    }
};
