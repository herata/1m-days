"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, ArrowLeft } from "lucide-react"

export default function AuthError() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md">
        <Card className="border-0 shadow-2xl sm:border sm:shadow-lg">
          <CardHeader className="text-center space-y-4 pb-6">
            <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-destructive/10 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-destructive" />
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold text-destructive">
              アクセスが拒否されました
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-center leading-relaxed">
              申し訳ございません。<br />
              このサービスを利用する権限がありません。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-0">
            <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20">
              <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <AlertDescription className="text-sm text-amber-800 dark:text-amber-200">
                許可されたメールアドレスでサインインしてください。アクセス権限が必要な場合は、管理者にお問い合わせください。
              </AlertDescription>
            </Alert>
            
            <div className="space-y-3">
              <Button
                onClick={() => router.push("/auth/signin")}
                className="w-full h-12 text-base font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                size="lg"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span className="text-sm sm:text-base">
                  再度サインインする
                </span>
              </Button>
              
              <Button
                onClick={() => router.push("/")}
                variant="outline"
                className="w-full h-10 text-sm transition-all duration-200"
              >
                ホームに戻る
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* サポート情報 */}
        <div className="mt-6 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            問題が解決しない場合は、サポートチームまでお問い合わせください
          </p>
        </div>
      </div>
    </div>
  )
}
