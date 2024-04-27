import prisma from '@/lib/prisma';

export const authConfig = {
    // adapter: PrismaAdapter(prisma),
    page: {
        signIn: '/login',
    },
    providers: [],
    callbacks: {
        // FOR MORE DETAIL ABOUT CALLBACK FUNCTIONS CHECK https://next-auth.js.org/configuration/callbacks
        async jwt({
            token,
            user,
            account,
            trigger,
            session,
        }: {
            token: any;
            user: any;
            account: any;
            trigger: any;
            session: any;
        }) {
            if (user) {
                const databaseUser = await prisma.user.findUnique({
                    where: { email: user.email },
                });
                token.id = databaseUser?.id || user.id;
                token.role = databaseUser?.role || user.role || 'USER';
                token.email = user.email;
                token.img = user.img || user.image || user.picture;
                token.fullName = user.fullName || user.name;
            }
            if (account) {
                token.accessToken = account.access_token;
            }
            if (trigger === 'update' && session) {
                token = { ...token, ...session.user };
            }
            return token;
        },
        async session({ session, token }: { session: any; token: any }) {
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
                session.user.email = token.email;
                session.user.img = token.img;
                session.user.fullName = token.fullName;
                session.accessToken = token.accessToken;
            }
            return session;
        },
        // authorized({ auth, request }: { auth: any; request: any }) {
        //     console.log('authorized', auth, request);
        //     const user = auth?.user;
        //     const isOnLoginPage =
        //         request.nextUrl?.pathname.startsWith('/login');
        //     const isOnRegisterPage =
        //         request.nextUrl?.pathname.startsWith('/register');

        //     // ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE
        //     if (isOnLoginPage && user) {
        //         return Response.redirect(new URL('/', request.nextUrl));
        //     }
        //     if (isOnRegisterPage && user) {
        //         return Response.redirect(new URL('/', request.nextUrl));
        //     }

        //     return true;
        // },
    },
};
