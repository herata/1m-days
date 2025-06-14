"use client";

import { CopilotChat } from "@copilotkit/react-ui";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { LogOut, Menu } from "lucide-react";
import { useState, useEffect } from "react";

export default function CopilotChatPage() {
	const { data: session, status } = useSession();
	const [showUserMenu, setShowUserMenu] = useState(false);
	const [isComposing, setIsComposing] = useState(false);

	// 日本語入力の制御
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			// CopilotChatの入力フィールドをターゲットとする場合のみ処理
			const target = event.target as HTMLElement;
			if (!target.matches('input[type="text"], textarea')) return;

			// Enterキーが押された場合
			if (event.key === 'Enter') {
				// 日本語入力中（変換中）の場合は送信を防ぐ
				if (isComposing) {
					event.preventDefault();
					event.stopPropagation();
					return false;
				}
				// Shift+Enterの場合は改行（デフォルトの動作）
				if (event.shiftKey) {
					return;
				}
				// 通常のEnterキーの場合は送信を許可
			}
		};

		const handleCompositionStart = () => {
			setIsComposing(true);
		};

		const handleCompositionEnd = () => {
			setIsComposing(false);
		};

		// クリック外しでメニューを閉じる
		const handleClickOutside = (event: MouseEvent) => {
			if (showUserMenu) {
				const target = event.target as HTMLElement;
				if (!target.closest('.mobile-menu-container')) {
					setShowUserMenu(false);
				}
			}
		};

		// イベントリスナーを追加
		document.addEventListener('keydown', handleKeyDown, true);
		document.addEventListener('compositionstart', handleCompositionStart, true);
		document.addEventListener('compositionend', handleCompositionEnd, true);
		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('keydown', handleKeyDown, true);
			document.removeEventListener('compositionstart', handleCompositionStart, true);
			document.removeEventListener('compositionend', handleCompositionEnd, true);
			document.removeEventListener('click', handleClickOutside);
		};
	}, [isComposing, showUserMenu]);

	// 未認証の場合はサインインページにリダイレクト
	useEffect(() => {
		if (status === "unauthenticated") {
			window.location.href = "/auth/signin";
		}
	}, [status]);

	if (status === "loading") {
		return (
			<div className="flex h-screen w-screen items-center justify-center bg-background">
				<div className="text-center space-y-4">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
					<p className="text-sm sm:text-base text-muted-foreground">読み込み中...</p>
				</div>
			</div>
		);
	}

	if (!session) {
		return (
			<div className="flex h-screen w-screen items-center justify-center bg-background">
				<div className="text-center space-y-4">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
					<p className="text-sm sm:text-base text-muted-foreground">認証中...</p>
				</div>
			</div>
		);
	}

	const userInitials = session?.user?.name
		?.split(" ")
		.map(n => n[0])
		.join("")
		.toUpperCase() || "U";

	return (
		<div className="h-screen w-screen flex flex-col bg-background overflow-hidden">
			{/* Compact Header */}
			<div className="flex items-center justify-between p-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				{/* Left: Simple user info */}
				<div className="flex items-center space-x-2">
					<Avatar className="h-6 w-6 flex-shrink-0">
						<AvatarImage src={session?.user?.image || ""} alt="Profile" />
						<AvatarFallback className="bg-muted text-muted-foreground text-xs">
							{userInitials}
						</AvatarFallback>
					</Avatar>
					<span className="text-xs text-muted-foreground font-medium hidden sm:block">
						{session?.user?.name || "ユーザー"}
					</span>
				</div>

				{/* Right: Menu */}
				<div className="flex items-center">
					{/* Desktop: Sign out button */}
					<div className="hidden sm:block">
						<Button 
							onClick={() => signOut({ callbackUrl: "/auth/signin" })}
							variant="ghost"
							size="sm"
							className="text-xs h-7 px-2 text-muted-foreground hover:text-foreground"
						>
							<LogOut className="h-3 w-3 mr-1" />
							サインアウト
						</Button>
					</div>

					{/* Mobile: Menu button */}
					<div className="sm:hidden mobile-menu-container">
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setShowUserMenu(!showUserMenu)}
							className="h-7 w-7 p-0"
						>
							<Menu className="h-3 w-3" />
						</Button>
					</div>
				</div>

				{/* Mobile menu dropdown */}
				{showUserMenu && (
					<div className="absolute top-12 right-2 z-50 sm:hidden bg-card border rounded-md shadow-md min-w-[200px] mobile-menu-container">
						<div className="p-2 space-y-2">
							<div className="text-xs text-muted-foreground truncate px-2">
								{session?.user?.name}
							</div>
							<div className="text-xs text-muted-foreground truncate px-2">
								{session?.user?.email}
							</div>
							<Separator />
							<Button 
								onClick={() => {
									setShowUserMenu(false);
									signOut({ callbackUrl: "/auth/signin" });
								}}
								variant="ghost"
								size="sm"
								className="w-full justify-start text-xs h-7"
							>
								<LogOut className="h-3 w-3 mr-1" />
								サインアウト
							</Button>
						</div>
					</div>
				)}
			</div>

			{/* Chat interface - Full height with input at bottom */}
			<div className="flex-1 overflow-hidden">
				<div className="h-full w-full copilot-chat-container">
					<CopilotChat
						labels={{
							title: "AI Chat Assistant",
							initial: "👋 こんにちは！AIアシスタントです。何かお手伝いできることはありますか？",
							placeholder: "メッセージを入力してください...",
						}}
						instructions="You are a helpful AI assistant. Be friendly, concise, and helpful in your responses. Respond in Japanese when the user writes in Japanese."
						className="h-full flex flex-col"
					/>
				</div>
			</div>
		</div>
	);
}
