import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt-ts';
import prisma from '@/lib/prisma';
import { authConfig } from './auth.config';
import { LoginType } from '@prisma/client';

const login = async (credentials: any) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email: credentials.email },
        });

        if (!user) {
            // throw new Error('No user found');
            return null;
        }

        const isPasswordValid = await compare(
            credentials.password,
            user.password || ''
        );

        if (!isPasswordValid) {
            // throw new Error('Password is invalid');
            return null;
        }

        return user;
    } catch (err) {
        // throw new Error('Error logging in');
        return null;
    }
};

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
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
            async authorize(credentials: any) {
                try {
                    const user = await login(credentials);
                    return user;
                } catch (err) {
                    console.log(err);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    secret: process.env.AUTH_SECRET,
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
                            return false;
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
                            },
                        });

                        user = { ...user, ...newUser };
                    } else {
                        user = { ...user, ...githubUser };
                    }
                } catch (err) {
                    return false;
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
                            return false;
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
                            },
                        });

                        user = { ...user, ...newUser };
                    } else {
                        user = { ...googleUser };
                    }
                } catch (err) {
                    return false;
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
        // async redirect({ url, baseUrl }) {
        //     return baseUrl;
        // },
        ...authConfig.callbacks,
    },
});
