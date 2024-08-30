"use client";
import { NextUIProvider } from "@nextui-org/react";
import { StoreProvider } from "./StoreProvider";
import StyledComponentsRegistry from "./StyledComponentRegistry";
import SynchroProvider from "./SynchroProvider";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<NextUIProvider>
			<StoreProvider>
				<StyledComponentsRegistry>
					<SynchroProvider>{children}</SynchroProvider>
				</StyledComponentsRegistry>
			</StoreProvider>
		</NextUIProvider>
	);
}
