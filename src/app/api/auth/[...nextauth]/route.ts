import NextAuth, { NextAuthOptions } from "next-auth";
import CredentailsProvider from "next-auth/providers/credentials";
import prisma from "../../../../../prisma/client";

const authOptions: NextAuthOptions = {
    providers: [
        CredentailsProvider({
            name: "creds",
            type: "credentials",
            credentials: {
                userName: {
                    type: "text",
                    label: "Kullanıcı Adı",
                },
                password: {
                    type: "password",
                    label: "Şifre",
                },
            },
            async authorize(credentials, req) {
                console.log('process.env.NEXTAUTH_SECRET', process.env.NEXTAUTH_SECRET )

                const user = await prisma.user.findUnique({
                    where: {
                        userName: credentials?.userName,
                        AND: {
                            password: credentials?.password,
                        },
                    },
                });
                await prisma.$disconnect();

                if (!user) {
                    // throw new Error("Geçersiz bilgiler");
                    return null;
                }

                return {
                    ...user,
                    id: user?.id.toString(),
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user?.role;
                token.userName = user?.userName;
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role;
                session.user.userName = token.userName;
            }
            return session;
        }
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
    theme: {
        colorScheme: "light",
        buttonText: "asd",
        logo: "/images/logo/logo-dark.png",
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
