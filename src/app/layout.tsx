import GlobalStyle from "@/ui/fondations/GlobalStyle";
import AppBarMenu from "@/ui/organisms/Bars/AppBarMenu";
import Modals from "@/ui/organisms/Modals/Modals";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "./_Providers/Providers";
import "./globals.css";
import { ChildrenContainer } from "./baseCss";
import LeftSideBar from "@/ui/organisms/Bars/LeftSideBar";
import RightSideBar from "@/ui/organisms/Bars/RightSideBar";
import BottomTaskBar from "@/ui/organisms/Bars/BottomTaskBar";
import { Quantico } from "next/font/google";

const quantico = Quantico({
	weight: "400",
	subsets: ["latin"],
	display: "swap",
	variable: "--font-quantico",
});

export const metadata: Metadata = {
	title: "Empire universe 4",
	description: "Empire universe 4",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${quantico.variable}`}>
				<Providers>
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
	);
}
