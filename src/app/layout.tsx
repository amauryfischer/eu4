"use client"
import { Inter } from "next/font/google"
import "./globals.css"
import GlobalStyle from "@/ui/fondations/GlobalStyle"
import { Provider } from "react-redux"
import { NextUIProvider } from "@nextui-org/react"
import store from "../redux/store/store"

const inter = Inter({ subsets: ["latin"] })

// export const metadata = {
// 	title: "Numérisk buisness",
// 	description: "Numérisk buisness",
// }

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<NextUIProvider>
					<Provider store={store}>
						<GlobalStyle />
						<>{children}</>
					</Provider>
				</NextUIProvider>
			</body>
		</html>
	)
}
