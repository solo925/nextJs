import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.AUTH_GITHUB_ID!,
            clientSecret: process.env.AUTH_GITHUB_SECRET!,
        }),
    ],
    pages: {
        signIn: "/login", // Custom login page
        signOut: "/auth/logout", // Optional custom logout page
        error: "/auth/error", // Optional custom error page
        verifyRequest: "/auth/verify-request",
        newUser: "/auth/register",
    },
});
