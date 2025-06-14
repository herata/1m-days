import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, account, profile }) {
      const allowedEmails: string[] = [
        "hsgru3@gmail.com"
      ];
      if (user.email && allowedEmails.includes(user.email)) {
        return true;
      }
      return false;
    },
    async redirect({ url, baseUrl }) {
      // 認証成功後は常にホームページにリダイレクト
      return baseUrl;
    },
    async session({ session, token }) {
      return session;
    },
    async jwt({ token, user }) {
      return token;
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  }
})
