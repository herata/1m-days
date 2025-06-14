"use client"

import { signIn, getProviders } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

interface Provider {
  id: string
  name: string
  type: string
  signinUrl: string
  callbackUrl: string
}

export default function SignIn() {
  const [providers, setProviders] = useState<Record<string, Provider> | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const providers = await getProviders()
      setProviders(providers)
    }
    fetchData()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md">
        <Card className="border-0 shadow-2xl sm:border sm:shadow-lg">
          <CardHeader className="text-center space-y-2 pb-6">
            <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg 
                className="w-6 h-6 sm:w-8 sm:h-8 text-primary" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                />
              </svg>
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold">
              サインイン
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Googleアカウントでサインインして<br className="sm:hidden" />
              サービスをご利用ください
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            {providers && Object.values(providers).map((provider: Provider) => (
              <Button
                key={provider.name}
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                className="w-full h-12 text-base font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                size="lg"
              >
                <svg 
                  className="mr-3 h-5 w-5 sm:h-6 sm:w-6" 
                  viewBox="0 0 24 24" 
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-sm sm:text-base">
                  {provider.name}でサインイン
                </span>
              </Button>
            ))}
            
            {/* ローディング状態 */}
            {!providers && (
              <div className="w-full h-12 flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* フッター */}
        <div className="mt-6 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            サインインすることで、利用規約とプライバシーポリシーに同意したものとみなされます
          </p>
        </div>
      </div>
    </div>
  )
}
