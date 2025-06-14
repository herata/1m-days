import { auth } from "@/auth"

export default auth((req) => {
  // 認証が必要なパスかチェック
  const isAuthPage = req.nextUrl.pathname.startsWith("/auth")
  const isApiAuthRoute = req.nextUrl.pathname.startsWith("/api/auth")
  
  // 認証ページやAPI認証ルートはスキップ
  if (isAuthPage || isApiAuthRoute) {
    return
  }
  
  // ログインが必要なページで未認証の場合はサインインページにリダイレクト
  if (!req.auth) {
    return Response.redirect(new URL("/auth/signin", req.url))
  }
})

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
