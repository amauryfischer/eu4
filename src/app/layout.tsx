
"use client"
import { Inter } from "next/font/google"
import TopBar from "./TopBar/TopBar"
import "./globals.css"
import GlobalStyle from "@/ui/fondations/GlobalStyle"
import { NextUIProvider } from "@nextui-org/react";

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
	title: "Numérisk buisness",
	description: "Numérisk buisness",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<NextUIProvider>
					<TopBar />
					<GlobalStyle />
					<>{children}</>
				</NextUIProvider>
			</body>
		</html>
	)
}


