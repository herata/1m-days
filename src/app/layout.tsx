import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@copilotkit/react-ui/styles.css";
import { CopilotKit } from "@copilotkit/react-core";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "1M Days - AI Chat Assistant",
	description: "あなた専用のAIアシスタントとチャットしよう",
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
		title: "1M Days",
	},
	formatDetection: {
		telephone: false,
	},
};

export const viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
};

const publicApiKey = process.env.NEXT_PUBLIC_COPILOT_API_KEY;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<SessionProvider>
					<CopilotKit
						publicApiKey={publicApiKey}
						runtimeUrl="/api/copilotkit"
					>
						{children}
					</CopilotKit>
				</SessionProvider>
			</body>
		</html>
	);
}
