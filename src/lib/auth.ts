import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt-ts';
import prisma from '@/lib/prisma';
import { authConfig } from './auth.config';
import { LoginType, StatusType } from '@prisma/client';
import {
    AccountNotExistsError,
    EmailNotVerifiedError,
    InvalidLoginError,
    InvalidLoginTypeError,
    UnauthorizedError,
} from './errors';

const login = async (credentials: any) => {
    const user = await prisma.user.findUnique({
        where: { email: credentials.email },
    });

    if (!user) {
        throw new AccountNotExistsError();
    }

    if (user.loginType !== LoginType.LOCAL) {
        throw new InvalidLoginTypeError();
    }

    if (user.status === StatusType.BANNED) {
        throw new UnauthorizedError();
    }

    if (user.status === StatusType.NOT_ACTIVE) {
        throw new EmailNotVerifiedError();
    }

    const isPasswordValid = await compare(
        credentials.password,
        user.password || ''
    );

    if (!isPasswordValid) {
        throw new InvalidLoginError();
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
};

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    secret: `${process.env.AUTH_SECRET}`,
    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'email', type: 'email' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials.email || !credentials.password) {
                    return null;
                }
                const user = await login(credentials);
                return user;
            },
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: +(process.env.NEXT_PUBLIC_SESSION_MAX_AGE || 864000),
    },

    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === 'github') {
                try {
                    const githubUser = await prisma.user.findUnique({
                        where: {
                            email: profile?.email || '',
                        },
                    });

                    if (!githubUser) {
                        if (!profile?.email) {
                            return '/unauthorized';
                        }

                        const newUser = await prisma.user.create({
                            data: {
                                fullName: (
                                    profile.name ||
                                    profile.login ||
                                    'Unknown'
                                ).toString(),
                                username: (
                                    profile.login ||
                                    Math.random().toString(36).substring(7)
                                ).toString(),
                                email: profile.email,
                                img: (
                                    profile.avatar_url || '/avatar/noavatar.png'
                                ).toString(),
                                loginType: LoginType.GITHUB,
                                lastLogin: new Date(),
                                status: StatusType.ACTIVE,
                            },
                        });

                        user = { ...user, ...newUser };
                    } else if (githubUser.status === StatusType.BANNED) {
                        return '/unauthorized';
                    } else {
                        user = { ...user, ...githubUser };
                    }
                } catch (err) {
                    return '/unauthorized';
                }
            }
            if (account?.provider === 'google') {
                try {
                    const googleUser = await prisma.user.findUnique({
                        where: {
                            email: profile?.email || '',
                        },
                    });

                    if (!googleUser) {
                        if (!profile?.email) {
                            return '/unauthorized?error=account_banned';
                        }

                        const newUser = await prisma.user.create({
                            data: {
                                fullName: (
                                    profile.name || 'Unknown'
                                ).toString(),
                                username: Math.random()
                                    .toString(36)
                                    .substring(7)
                                    .toString(),
                                email: profile.email,
                                img: (
                                    profile.picture || '/avatar/noavatar.png'
                                ).toString(),
                                loginType: LoginType.GOOGLE,
                                lastLogin: new Date(),
                                status: StatusType.ACTIVE,
                            },
                        });

                        user = { ...user, ...newUser };
                    } else if (googleUser.status === StatusType.BANNED) {
                        return '/unauthorized?error=account_banned';
                    } else {
                        user = { ...googleUser };
                    }
                } catch (err) {
                    return '/unauthorized';
                }
            }
            if (user) {
                await prisma.user.update({
                    where: { id: user.id },
                    data: { lastLogin: new Date() },
                });
            }
            return true;
        },
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith('/')) return `${baseUrl}${url}`;
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },
        ...authConfig.callbacks,
    },
});
