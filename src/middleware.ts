import { auth } from './lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { CustomSession } from './lib/define';

// export default NextAuth(authConfig).auth;

export const config = {
    matcher: ['/((?!api|static|.*\\..*|_next).*)', '/api/:path*'],
};

const apiRequireSession = [
    '/api/comment/*/like',
    '/api/user/limits',
    '/api/user/status',
    '/api/post/*/comment',
    '/api/post/*/like',
    '/api/user/profile',
    '/api/post/*/bookmark',
    '/api/user/*/follow',
    '/api/posts/my-posts',
];

const urlRequireUnauthenticated = ['/login', '/register', '/activate'];

const urlRequireAuthenticated = [
    '/edit-profile',
    '/edit-profile/*',
    '/profile',
    '/profile/*',
    '/create-post',
    '/create-post/*',
];

const urlRequireWritePermission = [
    '/create-post',
    '/create-post/*',
    '/my-posts',
    '/my-posts/*',
];

const urlPostDetail = ['/post/*'];

function isUrlPostDetail(route: string) {
    return urlPostDetail.some(pattern => {
        const regex = new RegExp('^' + pattern.split('*').join('.*') + '$');
        return regex.test(route);
    });
}

function routeRequiresWritePermission(route: string) {
    return urlRequireWritePermission.some(pattern => {
        const regex = new RegExp('^' + pattern.split('*').join('.*') + '$');
        return regex.test(route);
    });
}

function routeRequiresSession(route: string) {
    return apiRequireSession.some(pattern => {
        const regex = new RegExp('^' + pattern.split('*').join('.*') + '$');
        return regex.test(route);
    });
}

function routeRequiresUnauthenticated(route: string) {
    return urlRequireUnauthenticated.some(pattern => {
        const regex = new RegExp('^' + pattern.split('*').join('.*') + '$');
        return regex.test(route);
    });
}

function routeRequiresAuthenticated(route: string) {
    return urlRequireAuthenticated.some(pattern => {
        const regex = new RegExp('^' + pattern.split('*').join('.*') + '$');
        return regex.test(route);
    });
}

export async function middleware(req: NextRequest) {
    const session = (await auth()) as CustomSession;
    const { pathname, searchParams } = req.nextUrl;
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    // ONLY AUTHENTICATED USERS CAN ACCESS CERTAIN POST DETAIL ROUTES
    // if (isUrlPostDetail(pathname)) {
    //     if (!session?.user) {
    //         return Response.redirect(new URL('/login', req.nextUrl));
    //     }
    // }

    // ONLY UNAUTHENTICATED USERS CAN REACH CERTAIN ROUTES
    if (routeRequiresAuthenticated(pathname) && !session?.user) {
        return Response.redirect(new URL(callbackUrl, req.nextUrl));
    }

    // ONLY AUTHENTICATED USERS CAN ACCESS CERTAIN ROUTES
    if (routeRequiresUnauthenticated(pathname) && session?.user) {
        return Response.redirect(new URL(callbackUrl, req.nextUrl));
    }

    // ONLY WRITERS CAN ACCESS CERTAIN ROUTES
    if (routeRequiresWritePermission(pathname)) {
        if (session?.user?.role !== 'WRITER') {
            return Response.redirect(new URL(callbackUrl, req.nextUrl));
        }
    }

    // ONLY AUTHENTICATED USERS CAN ACCESS CERTAIN API ROUTES
    if (routeRequiresSession(pathname)) {
        if (!session) {
            return NextResponse.json(
                {
                    data: {
                        error: 'Bạn phải đăng nhập để thực hiện yêu cầu này',
                    },
                },
                { status: 401 }
            );
        } else if (new Date(session.expires) < new Date()) {
            return NextResponse.json(
                {
                    data: { error: 'Phiên làm việc đã hết hạn' },
                },
                { status: 401 }
            );
        }
    }
}

// FOR MORE INFORMATION CHECK: https://nextjs.org/docs/app/building-your-application/routing/middleware
