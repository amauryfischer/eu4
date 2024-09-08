"use client"
import { NextUIProvider } from "@nextui-org/react"
import { StoreProvider } from "./StoreProvider"
import StyledComponentsRegistry from "./StyledComponentRegistry"
import SynchroProvider from "./SynchroProvider"
import { Session } from "next-auth"
import { AuthProvider } from "./AuthProvider"

export function Providers({
	session,
	children
}: {
	children: React.ReactNode
	session?: Session | null
}) {
	return (
		<AuthProvider session={session}>
			<NextUIProvider>
				<StoreProvider>
					<StyledComponentsRegistry>
						<SynchroProvider>{children}</SynchroProvider>
					</StyledComponentsRegistry>
				</StoreProvider>
			</NextUIProvider>
		</AuthProvider>
	)
}
