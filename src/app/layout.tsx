import GlobalStyle from "@/ui/fondations/GlobalStyle"
import AppBarMenu from "@/ui/organisms/Bars/AppBarMenu"
import Modals from "@/ui/organisms/Modals/Modals"
import type { Metadata } from "next"
import { Providers } from "./_Providers/Providers"
import "./globals.css"
import { ChildrenContainer } from "./baseCss"
import LeftSideBar from "@/ui/organisms/Bars/LeftSideBar"
import RightSideBar from "@/ui/organisms/Bars/RightSideBar"
import BottomTaskBar from "@/ui/organisms/Bars/BottomTaskBar"
import { Quantico } from "next/font/google"
import { auth } from "../auth"

// If loading a variable font, you don't need to specify the font weight
const quantico = Quantico({
	weight: ["400", "700"],
	display: "swap",
	variable: "--font-quantico",
	adjustFontFallback: false
})

export const metadata: Metadata = {
	title: "Empire universe 4",
	description: "Empire universe 4"
}

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const session = await auth()

	return (
		<html lang="fr" className={quantico.variable}>
			<body>
				<Providers session={session}>
					<GlobalStyle />
					<Modals />
					<AppBarMenu />
					<LeftSideBar />
					<RightSideBar />
					<BottomTaskBar />
					<ChildrenContainer>{children}</ChildrenContainer>
				</Providers>
			</body>
		</html>
	)
}
