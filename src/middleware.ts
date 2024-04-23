import NextAuth from 'next-auth';
import { authConfig } from './lib/auth.config';
import { auth } from './lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export default NextAuth(authConfig).auth;

export const config = {
    matcher: ['/((?!api|static|.*\\..*|_next).*)', '/api/:path*'],
};

const apiRequireSession = [
    '/api/comment/*/like',
    '/api/user/limits',
    '/api/user/status',
    '/api/post/*/comment',
    '/api/post/*/like',
];

function routeRequiresSession(route: string) {
    return apiRequireSession.some(pattern => {
        const regex = new RegExp('^' + pattern.split('*').join('.*') + '$');
        return regex.test(route);
    });
}

export async function middleware(req: NextRequest) {
    const session = await auth();
    const { pathname, searchParams } = req.nextUrl;
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    // ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE
    if (pathname.startsWith('/login') && session?.user) {
        return Response.redirect(new URL(callbackUrl, req.nextUrl));
    }
    if (pathname.startsWith('/register') && session?.user) {
        return Response.redirect(new URL(callbackUrl, req.nextUrl));
    }
    if (pathname.startsWith('/unauthorized') && session?.user) {
        return Response.redirect(new URL(callbackUrl, req.nextUrl));
    }

    // ONLY AUTHENTICATED USERS CAN ACCESS CERTAIN ROUTES
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
